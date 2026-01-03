import express from "express";
import { sendBookingConfirmation } from "../services/emailService.js";

const router = express.Router();

// Test email endpoint
router.post("/test", async (req, res) => {
  try {
    console.log("Testing email with credentials...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);

    const testData = {
      name: "Test Customer",
      email: req.body.email || "shalum.av15@gmail.com",
      appointment_date: "2026-01-21",
      appointment_time: "17:30",
      service: "Gel Manicure",
      appointmentId: 999,
    };

    const result = await sendBookingConfirmation(testData);

    if (result.success) {
      res.json({
        success: true,
        message: "Test email sent successfully! Check your inbox.",
        emailSentTo: testData.email,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        message: "Failed to send test email",
      });
    }
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString(),
    });
  }
});

export default router;
