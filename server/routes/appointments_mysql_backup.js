import express from "express";
import pool from "../config/db.js";
import {
  sendBookingConfirmation,
  sendCancellationEmail,
  sendRescheduleEmail,
} from "../services/emailService.js";
import {
  createCalendarEvent,
  updateCalendarEvent,
  cancelCalendarEvent,
} from "../services/calendarService.js";

const router = express.Router();

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time DESC'
    );
    const appointments = result.rows;
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Get available time slots for a specific date
router.get("/available-slots/:date", async (req, res) => {
  try {
    const { date } = req.params;

    // Get all booked slots for the date (excluding cancelled)
    const [bookedSlots] = await pool.query(
      "SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != 'cancelled'",
      [date]
    );

    // Define all possible time slots (9 AM - 6 PM)
    const allSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];

    // Filter out booked slots
    const bookedTimes = bookedSlots.map((slot) => slot.appointment_time);
    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    res.json({
      date,
      availableSlots,
      bookedSlots: bookedTimes,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

// Get appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const [appointment] = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id]
    );

    if (appointment.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment[0]);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

// Create new appointment (Booking)
router.post("/", async (req, res) => {
  const {
    name,
    email,
    phone,
    appointment_date,
    appointment_time,
    service,
    message,
  } = req.body;

  // Validation
  if (
    !name ||
    !email ||
    !phone ||
    !appointment_date ||
    !appointment_time ||
    !service
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    // Check if time slot is already booked
    const [existing] = await pool.query(
      "SELECT * FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != ?",
      [appointment_date, appointment_time, "cancelled"]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: "This time slot is already booked. Please choose another time.",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO appointments 
       (name, email, phone, appointment_date, appointment_time, service, message, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        name,
        email,
        phone,
        appointment_date,
        appointment_time,
        service,
        message || "",
      ]
    );

    const appointmentId = result.insertId;

    console.log("📧 Preparing to send confirmation email...");
    console.log("Email will be sent to:", email);

    // Send confirmation email (async - don't wait for it)
    sendBookingConfirmation({
      name,
      email,
      appointment_date,
      appointment_time,
      service,
      appointmentId,
    })
      .then((result) => {
        if (result.success) {
          console.log("✅ Email sent successfully!");
        } else {
          console.error("❌ Email failed:", result.error);
        }
      })
      .catch((err) => {
        console.error("❌ Email sending exception:", err);
      });

    // Create Google Calendar event (async - don't wait for it)
    createCalendarEvent({
      name,
      email,
      phone,
      appointment_date,
      appointment_time,
      service,
      appointmentId,
      message,
    }).catch((err) => {
      console.error("❌ Calendar event creation failed:", err);
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId,
      appointmentDetails: {
        name,
        email,
        date: appointment_date,
        time: appointment_time,
        service,
      },
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Update appointment status (Admin)
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment status updated successfully" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Get appointment by email (for customer booking history)
router.get("/customer/:email", async (req, res) => {
  try {
    const [appointments] = await pool.query(
      "SELECT * FROM appointments WHERE email = ? ORDER BY appointment_date DESC, appointment_time DESC",
      [req.params.email]
    );
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching customer appointments:", error);
    res.status(500).json({ error: "Failed to fetch customer appointments" });
  }
});

// Get available time slots for a specific date
router.get("/availability/:date", async (req, res) => {
  try {
    const [bookedSlots] = await pool.query(
      "SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != ?",
      [req.params.date, "cancelled"]
    );

    const allSlots = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
    ];

    const bookedTimes = bookedSlots.map((slot) => slot.appointment_time);
    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    res.json({
      date: req.params.date,
      availableSlots,
      bookedSlots: bookedTimes,
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Failed to fetch availability" });
  }
});

// Update appointment (Customer rescheduling)
router.put("/:id", async (req, res) => {
  const { appointment_date, appointment_time } = req.body;

  if (!appointment_date || !appointment_time) {
    return res.status(400).json({ error: "Date and time are required" });
  }

  try {
    // Check if new time slot is available
    const [existing] = await pool.query(
      "SELECT * FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != ? AND id != ?",
      [appointment_date, appointment_time, "cancelled", req.params.id]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: "This time slot is already booked. Please choose another time.",
      });
    }

    // Get appointment details for email
    const [appointment] = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id]
    );

    const [result] = await pool.query(
      "UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE id = ?",
      [appointment_date, appointment_time, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Send reschedule email
    if (appointment.length > 0) {
      sendRescheduleEmail({
        name: appointment[0].name,
        email: appointment[0].email,
        appointment_date,
        appointment_time,
        service: appointment[0].service,
        appointmentId: req.params.id,
      }).catch((err) => console.error("Email sending failed:", err));
    }

    res.json({ message: "Appointment rescheduled successfully" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Cancel appointment (Customer)
router.patch("/:id/cancel", async (req, res) => {
  try {
    // Get appointment details for email
    const [appointment] = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id]
    );

    const [result] = await pool.query(
      "UPDATE appointments SET status = 'cancelled' WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Send cancellation email
    if (appointment.length > 0) {
      sendCancellationEmail({
        name: appointment[0].name,
        email: appointment[0].email,
        appointment_date: appointment[0].appointment_date,
        appointment_time: appointment[0].appointment_time,
        service: appointment[0].service,
        appointmentId: req.params.id,
      }).catch((err) => console.error("Email sending failed:", err));
    }

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
});

// Delete appointment (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM appointments WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

export default router;
