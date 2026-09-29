const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://carrer-path-ai.vercel.app",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Resume routes
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CareerPath AI Backend is running 🚀",
  });
});

// Export app for Vercel
module.exports = app;