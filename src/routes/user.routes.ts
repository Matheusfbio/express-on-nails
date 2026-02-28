import connection from "db/connection";
import { Router } from "express";
import { warn } from "node:console";

const router = Router();

router.get("/users", async (request, response) => {
  try {
    const getUsers = await connection.query("SELECT * FROM users");
    response.json(getUsers.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (request, response) => {
  try {
    const { username, password, role } = request.body;

    if (!username || !password || !role) {
      return response
        .status(400)
        .json({ error: "username, password and role are required" });
    }

    const result = await connection.query(
      "INSERT INTO users (username, password, role) values ($1, $2, $3) RETURNING *",
      [username, password, role],
    );

    response.status(201).json({
      message: "User created successfully",
      users: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user", error);
    // send a response on failure so the request doesn't hang
    response.status(500).json({ error: "Internal server error" });
  }
});
export default router;
