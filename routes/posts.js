// src/routes/posts.js
import express from "express";
import { getClient } from "../db.js";

const router = express.Router();

// GET all posts with user info
router.get("/", async (req, res) => {
  const client = getClient();
  await client.connect();
  try {
    const result = await client.query(`
      SELECT p.id, p.title, p.content, u.id AS user_id, u.name AS user_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

// POST create post
router.post("/", async (req, res) => {
  const { user_id, title, content } = req.body;
  const client = getClient();
  await client.connect();
  try {
    const result = await client.query(
      "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

// DELETE post by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const client = getClient();
  await client.connect();
  try {
    await client.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.end();
  }
});

export default router;
