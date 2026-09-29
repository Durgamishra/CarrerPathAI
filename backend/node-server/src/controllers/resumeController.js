const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/openrouterService");

async function analyzeResumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the PDF.",
      });
    }

    const analysis = await analyzeResume(resumeText);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

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