// src/routes/users.js
import express from "express";
import { getClient } from "../db.js";

const router = express.Router();

// GET all users with number of posts
router.get("/", async (req, res) => {
  const client = getClient();
  await client.connect();
  try {
    const result = await client.query(`
      SELECT u.id, u.name, u.email, COUNT(p.id) AS post_count
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id
      ORDER BY u.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

// GET a user's posts by ID
router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const client = getClient();
  await client.connect();
  try {
    const result = await client.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY id ASC",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

// POST create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const client = getClient();
  await client.connect();
  try {
    const result = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

// DELETE user 
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const client = getClient();
  await client.connect();
  try {
    await client.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ ok: true, message: "User deleted (posts auto-deleted)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

export default router;
