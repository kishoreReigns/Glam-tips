import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all services
router.get("/", async (req, res) => {
  try {
    const [services] = await pool.query(
      "SELECT * FROM services ORDER BY id ASC"
    );
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Get service by ID
router.get("/:id", async (req, res) => {
  try {
    const [service] = await pool.query("SELECT * FROM services WHERE id = ?", [
      req.params.id,
    ]);

    if (service.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service[0]);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// Create new service (Admin)
router.post("/", async (req, res) => {
  const { title, price, duration, description, features } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO services (title, price, duration, description, features) VALUES (?, ?, ?, ?, ?)",
      [title, price, duration, description, JSON.stringify(features)]
    );

    res.status(201).json({
      message: "Service created successfully",
      serviceId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

// Update service (Admin)
router.put("/:id", async (req, res) => {
  const { title, price, duration, description, features } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE services SET title = ?, price = ?, duration = ?, description = ?, features = ? WHERE id = ?",
      [
        title,
        price,
        duration,
        description,
        JSON.stringify(features),
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
});

// Delete service (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM services WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;
