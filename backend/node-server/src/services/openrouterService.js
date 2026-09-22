const { Client } = require("@gradio/client");

async function analyzeResume(resumeText, targetRole = "AI Engineer") {
  try {
    if (!resumeText || !resumeText.trim()) {
      throw new Error("Resume text is empty.");
    }

    console.log("🤖 Sending resume to CareerPath AI Hugging Face model...");
    console.log("🎯 Target role:", targetRole);

    // Connect to your Hugging Face Space
    const client = await Client.connect("Durgamishra1/AI");

    // Call the Gradio API
    const result = await client.predict(
      "/analyze_resume",
      {
        resume_text: resumeText,
        target_role: targetRole,
      }
    );

    console.log("✅ Response received from Hugging Face");

    /*
     * Gradio returns the function output.
     * Our Space returns JSON as a string.
     */
    let content = result?.data?.[0];

    if (!content) {
      throw new Error("Hugging Face returned an empty response.");
    }

    console.log("RAW AI RESPONSE:");
    console.log(content);

    // If Gradio already returned an object
    if (typeof content === "object") {
      return content;
    }

    // Make sure it is a string
    content = String(content).trim();

    // Remove markdown fences if the model accidentally adds them
    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Find JSON object
    const firstBrace = content.indexOf("{");
    const lastBrace = content.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error(
        "Hugging Face model did not return a valid JSON object."
      );
    }

    content = content.substring(
      firstBrace,
      lastBrace + 1
    );

    let analysis;

    try {
      analysis = JSON.parse(content);
    } catch (parseError) {
      console.error("❌ JSON PARSE ERROR:", parseError.message);
      console.error("CLEANED AI RESPONSE:");
      console.error(content);

      throw new Error(
        "AI returned malformed JSON."
      );
    }

    // -------------------------------------------------------
    // BASIC NORMALIZATION
    // -------------------------------------------------------

    analysis.candidate =
      analysis.candidate || {};

    analysis.candidate.name =
      analysis.candidate.name || "";

    analysis.candidate.email =
      analysis.candidate.email || "";

    analysis.candidate.phone =
      analysis.candidate.phone || "";

    analysis.candidate.location =
      analysis.candidate.location || "";

    analysis.candidate.links =
      Array.isArray(analysis.candidate.links)
        ? analysis.candidate.links
        : [];

    analysis.education =
      Array.isArray(analysis.education)
        ? analysis.education
        : [];

    analysis.experience =
      Array.isArray(analysis.experience)
        ? analysis.experience
        : [];

    analysis.projects =
      Array.isArray(analysis.projects)
        ? analysis.projects
        : [];

    analysis.skills =
      Array.isArray(analysis.skills)
        ? analysis.skills
        : [];

    analysis.certifications =
      Array.isArray(analysis.certifications)
        ? analysis.certifications
        : [];

    analysis.strengths =
      normalizeStringArray(analysis.strengths);

    analysis.weaknesses =
      normalizeStringArray(analysis.weaknesses);

    analysis.missingSkills =
      normalizeStringArray(analysis.missingSkills);

    analysis.improvements =
      normalizeStringArray(analysis.improvements);

    analysis.roadmap =
      Array.isArray(analysis.roadmap)
        ? analysis.roadmap
        : [];

    analysis.resumeScore =
      normalizeScore(analysis.resumeScore);

    analysis.atsScore =
      normalizeScore(analysis.atsScore);

    analysis.scoreExplanation =
      analysis.scoreExplanation || {};

    analysis.skillGapAnalysis =
      analysis.skillGapAnalysis || {};

    console.log("✅ AI analysis parsed successfully");

    return analysis;

  } catch (error) {

    console.error(
      "❌ Resume analysis error:",
      error
    );

    throw error;
  }
}


// -------------------------------------------------------
// SCORE NORMALIZATION
// -------------------------------------------------------

function normalizeScore(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(number)
    )
  );
}


// -------------------------------------------------------
// ARRAY NORMALIZATION
// -------------------------------------------------------

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item) => typeof item === "string"
  );
}


module.exports = {
  analyzeResume,
};