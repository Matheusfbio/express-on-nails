import connection from "db/connection";
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
    const createProduct = await connection.query(
      "INSERT INTO products(name, price) VALUES($1, $2) RETURNING *",
      [name, price],
      (error, results) => {
        if (error) {
          throw error;
        }
        response
          .status(201)
          .send(`Product created with Id: ${results.rows[0].id}`);
      },
    );
  } catch (error) {
    console.error(`Details error: ${error}`);
  }
});

export default router;
