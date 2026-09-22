const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
  analyzeResumeController,
} = require("../controllers/resumeController");

const router = express.Router();

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResumeController
);

module.exports = router;