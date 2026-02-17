import connection from "db/connection";
import { Router } from "express";

const router = Router();

router.get("/users", async (request, response) => {
  try {
    const getUsers = await connection.query(
      "SELECT * FROM users ORDER BY user_id ASC",
    );
    response.json(getUsers.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (request, response) => {
  try {
    const { username, password, role } = request.body;
    const result = await connection.query(
      "INSERT INTO users (username, password, role) values ($1, $2, $3) RETURNING *",
      [username, password, role],
    );
    response.status(201).json({
      message: "User created successfully",
      users: result.rows[0],
    });
  } catch (error) {}
});
export default router;
