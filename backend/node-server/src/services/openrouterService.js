const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText, targetRole = "AI Engineer") {
  try {
    if (!resumeText || !resumeText.trim()) {
      throw new Error("Resume text is empty.");
    }

    console.log("🤖 Sending resume to Gemini...");
    console.log("🎯 Target role:", targetRole);

    const prompt = `
You are CareerPath AI, an AI career and resume analysis assistant.

Analyze the following resume for the target role.

TARGET ROLE:
${targetRole}

RESUME:
${resumeText}

IMPORTANT RULES:

1. Analyze ONLY information supported by the resume.
2. Do not invent education, experience, projects, skills, certifications, or achievements.
3. Identify missing skills based on the target role.
4. Give practical resume improvement suggestions.
5. Generate a realistic learning roadmap for the target role.
6. Scores must be integers from 0 to 100.
7. The target role must be "${targetRole}".
8. Keep the response useful for a BCA/student-level candidate.
9. Return ONLY the requested JSON structure.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            candidate: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                links: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: [
                "name",
                "email",
                "phone",
                "location",
                "links",
              ],
            },

            resumeScore: {
              type: "integer",
            },

            atsScore: {
              type: "integer",
            },

            scoreExplanation: {
              type: "object",
              properties: {
                resumeScoreReason: {
                  type: "string",
                },
                atsScoreReason: {
                  type: "string",
                },
              },
              required: [
                "resumeScoreReason",
                "atsScoreReason",
              ],
            },

            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  degree: { type: "string" },
                  institution: { type: "string" },
                  year: { type: "string" },
                  details: { type: "string" },
                },
                required: [
                  "degree",
                  "institution",
                  "year",
                  "details",
                ],
              },
            },

            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company: { type: "string" },
                  role: { type: "string" },
                  duration: { type: "string" },
                  description: { type: "string" },
                },
                required: [
                  "company",
                  "role",
                  "duration",
                  "description",
                ],
              },
            },

            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  technologies: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: [
                  "name",
                  "description",
                  "technologies",
                ],
              },
            },

            skills: {
              type: "array",
              items: { type: "string" },
            },

            certifications: {
              type: "array",
              items: { type: "string" },
            },

            strengths: {
              type: "array",
              items: { type: "string" },
            },

            weaknesses: {
              type: "array",
              items: { type: "string" },
            },

            missingSkills: {
              type: "array",
              items: { type: "string" },
            },

            improvements: {
              type: "array",
              items: { type: "string" },
            },

            skillGapAnalysis: {
              type: "object",
              properties: {
                targetRole: { type: "string" },
                matchPercentage: { type: "integer" },
                requiredSkillsCount: { type: "integer" },
                readinessNow: { type: "string" },
                readinessAfterRoadmap: { type: "string" },
                demand: { type: "string" },
                typicalStack: {
                  type: "array",
                  items: { type: "string" },
                },
                hiringFocus: {
                  type: "array",
                  items: { type: "string" },
                },
                coreCompetencies: {
                  type: "array",
                  items: { type: "string" },
                },
                topGapExplanation: { type: "string" },
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      skill: { type: "string" },
                      status: { type: "string" },
                      importance: { type: "string" },
                      recommendation: { type: "string" },
                    },
                    required: [
                      "skill",
                      "status",
                      "importance",
                      "recommendation",
                    ],
                  },
                },
              },
              required: [
                "targetRole",
                "matchPercentage",
                "requiredSkillsCount",
                "readinessNow",
                "readinessAfterRoadmap",
                "demand",
                "typicalStack",
                "hiringFocus",
                "coreCompetencies",
                "topGapExplanation",
                "skills",
              ],
            },

            roadmap: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  phase: { type: "string" },
                  duration: { type: "string" },
                  focus: { type: "string" },
                  skills: {
                    type: "array",
                    items: { type: "string" },
                  },
                  projects: {
                    type: "array",
                    items: { type: "string" },
                  },
                  outcome: { type: "string" },
                },
                required: [
                  "phase",
                  "duration",
                  "focus",
                  "skills",
                  "projects",
                  "outcome",
                ],
              },
            },
          },

          required: [
            "candidate",
            "resumeScore",
            "atsScore",
            "scoreExplanation",
            "education",
            "experience",
            "projects",
            "skills",
            "certifications",
            "strengths",
            "weaknesses",
            "missingSkills",
            "improvements",
            "skillGapAnalysis",
            "roadmap",
          ],
        },
      },
    });

    const analysis = JSON.parse(response.text);

    console.log("✅ Gemini analysis received successfully");

    return analysis;
  } catch (error) {
    console.error("❌ Gemini analysis error:", error);
    throw error;
  }
}

module.exports = {
  analyzeResume,
};