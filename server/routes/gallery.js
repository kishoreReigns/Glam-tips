import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all gallery items
router.get("/", async (req, res) => {
  try {
    const [items] = await pool.query(
      "SELECT * FROM gallery ORDER BY created_at DESC"
    );
    res.json(items);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ error: "Failed to fetch gallery items" });
  }
});

// Get gallery item by ID
router.get("/:id", async (req, res) => {
  try {
    const [item] = await pool.query("SELECT * FROM gallery WHERE id = ?", [
      req.params.id,
    ]);

    if (item.length === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.json(item[0]);
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    res.status(500).json({ error: "Failed to fetch gallery item" });
  }
});

// Create new gallery item (Admin)
router.post("/", async (req, res) => {
  const { title, description, image_url, category } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO gallery (title, description, image_url, category) VALUES (?, ?, ?, ?)",
      [title, description || "", image_url, category || "nail-art"]
    );

    res.status(201).json({
      message: "Gallery item created successfully",
      itemId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

// Update gallery item (Admin)
router.put("/:id", async (req, res) => {
  const { title, description, image_url, category } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE gallery SET title = ?, description = ?, image_url = ?, category = ? WHERE id = ?",
      [title, description, image_url, category, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.json({ message: "Gallery item updated successfully" });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

// Delete gallery item (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM gallery WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

export default router;
