const fs = require("fs");

const {
  extractTextFromPDF,
} = require("../services/pdfService");

const {
  analyzeResume,
} = require("../services/openrouterService");

async function analyzeResumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    console.log("📄 Resume received:", req.file.originalname);

    // Step 1: Extract PDF text
    const resumeText = await extractTextFromPDF(
      req.file.path
    );

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the PDF.",
      });
    }

    console.log("✅ PDF text extracted");

    // Step 2: AI analysis
    const analysis = await analyzeResume(resumeText);

    console.log("✅ AI analysis completed");

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume.",
      error: error.message,
    });
  }
}

module.exports = {
  analyzeResumeController,
};