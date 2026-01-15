import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { testConnection } from "./config/db.js";

// Import routes
import servicesRoutes from "./routes/services.js";
import appointmentsRoutes from "./routes/appointments.js";
import galleryRoutes from "./routes/gallery.js";
import testEmailRoutes from "./routes/testEmail.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://glam-tips-git-main-kishorereigns-projects.vercel.app",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection on startup
testConnection();

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Glam Tips API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/api/health",
      services: "/api/services",
      appointments: "/api/appointments",
      gallery: "/api/gallery",
    },
  });
});

// Routes
app.use("/api/services", servicesRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/test-email", testEmailRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Glam Tips API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/health`);
});

// Export for Vercel
export default app;
