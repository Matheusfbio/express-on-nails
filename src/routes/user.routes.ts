import { sql } from "db/connection";
import { Router } from "express";

const router = Router();

router.get("/users", async (request, response) => {
  try {
    const result = await sql`SELECT * FROM users ORDER BY user_id ASC`;
    const users = result.map((user) => ({
      ...user,
      created_at: new Date(user.created_at).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
    }));
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (request, response) => {
  try {
    const { username, password, role } = request.body;
    const [user] = await sql`
      INSERT INTO users (username, password, role) 
      VALUES (${username}, ${password}, ${role}) 
      RETURNING *
    `;
    response.status(201).json({
      message: "User created successfully",
      users: user,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});
export default router;
