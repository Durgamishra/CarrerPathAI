const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Resume routes
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CareerPath AI Backend is running 🚀",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CareerPath AI Backend running on port ${PORT}`);
});