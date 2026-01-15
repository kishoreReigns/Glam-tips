import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all services
router.get("/", async (req, res) => {
  try {
    // Set cache control headers to prevent 304
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    const result = await pool.query("SELECT * FROM services ORDER BY id ASC");
    const services = result.rows;
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Get service by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services WHERE id = $1", [
      req.params.id,
    ]);
    const service = result.rows;

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
  const { name, price, duration, description, features, image_url } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO services (name, price, duration, description, features, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        name,
        price,
        duration,
        description,
        JSON.stringify(features),
        image_url || null,
      ]
    );

    res.status(201).json({
      message: "Service created successfully",
      serviceId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

// Update service (Admin)
router.put("/:id", async (req, res) => {
  const { name, price, duration, description, features, image_url } = req.body;

  try {
    const result = await pool.query(
      "UPDATE services SET name = $1, price = $2, duration = $3, description = $4, features = $5, image_url = $6 WHERE id = $7",
      [
        name,
        price,
        duration,
        description,
        JSON.stringify(features),
        image_url,
        req.params.id,
      ]
    );

    if (result.rowCount === 0) {
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
    const result = await pool.query("DELETE FROM services WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;
