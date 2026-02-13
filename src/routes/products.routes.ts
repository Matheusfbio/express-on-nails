import { error } from "node:console";
import connection from "../db/connection";
import { Router } from "express";

const router = Router();

router.get("/products", async (request, response) => {
  try {
    const getProducts = await connection.query(
      "SELECT * FROM products ORDER BY id ASC",
    );
    response.json(getProducts.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const getProductsById = await connection.query(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );
    if (getProductsById.rows.length === 0) {
      return response.status(404).json({ error: "Product not found" });
    }
    response.json(getProductsById.rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (request, response) => {
  try {
    const { name, price } = request.body;
    const result = await connection.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price],
    );
    response.status(201).json({
      message: "Product created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error(`Details error: ${error}`);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/products/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name, price } = request.body;
    const values = [name, price, id];
    const queryText =
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
    const updateProductsById = await connection.query(queryText, values);
    if (updateProductsById.rowCount === 0) {
      return response.status(404).json({ error: "Product not found" });
    }

    response.status(200).json({
      message: "Product updated successfully",
      product: updateProductsById.rows[0],
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const queryText = "DELETE FROM products WHERE id = $1 RETURNING *";
    const deleteProductsById = await connection.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id],
    );

    if (deleteProductsById.rowCount === 0) {
      return response.status(404).json({ error: "Product not found" });
    }

    response.status(200).json({
      message: "Product deleted successfully",
      product: deleteProductsById.rows[0],
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

export default router;
