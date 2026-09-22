import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function getGapColor(gap) {
  switch (gap?.toLowerCase()) {
    case "high":
      return "text-red-600";
    case "medium":
    case "low":
      return "text-amber-500";
    case "no gap":
      return "text-green-600";
    default:
      return "text-gray-500";
  }
}

function getCurrentColor(current) {
  switch (current?.toLowerCase()) {
    case "detected":
      return "text-green-600";
    case "partial":
      return "text-amber-500";
    case "missing":
      return "text-gray-400";
    default:
      return "text-gray-500";
  }
}

function getActionColor(action) {
  return action?.toLowerCase() === "strengthen"
    ? "text-blue-600"
    : "text-red-500";
}

export default function SkillGaps({ onNavigate }) {
  const [analysis, setAnalysis] = useState(null);
  const [selectedRole, setSelectedRole] = useState("AI Engineer");

  useEffect(() => {
    const storedAnalysis =
      sessionStorage.getItem("resumeAnalysis");

    if (!storedAnalysis) {
      return;
    }

    try {
      const apiData = JSON.parse(storedAnalysis);

      const resumeAnalysis =
        apiData?.analysis || apiData;

      setAnalysis(resumeAnalysis);

      if (resumeAnalysis?.skillGapAnalysis?.targetRole) {
        setSelectedRole(
          resumeAnalysis.skillGapAnalysis.targetRole
        );
      }
    } catch (error) {
      console.error(
        "Failed to load skill gap analysis:",
        error
      );
    }
  }, []);

  const skillGap = analysis?.skillGapAnalysis;

  const skills = skillGap?.skills || [];

  const coreCompetencies =
    skillGap?.coreCompetencies || [];

  const mlTopics =
    skillGap?.learningPath?.topics || [];

  const targetRole =
    skillGap?.targetRole || selectedRole;

  const matchPercentage =
    skillGap?.matchPercentage ?? 0;

  const readinessNow =
    skillGap?.readinessNow ?? 0;

  const readinessAfter =
    skillGap?.readinessAfterRoadmap ?? 0;

  const requiredSkillsCount =
    skillGap?.requiredSkillsCount ??
    skills.filter(
      (skill) =>
        skill.required?.toLowerCase() === "required"
    ).length;

  const typicalStack =
    skillGap?.typicalStack || "Not available";

  const hiringFocus =
    skillGap?.hiringFocus || "Not available";

  const demand =
    skillGap?.demand || "Not available";

  const topGapExplanation =
    skillGap?.topGapExplanation ||
    "Complete the highest-priority skill gaps to improve your readiness.";

  const highestImpact =
    skillGap?.learningPath?.title ||
    "Start with your highest-impact skill";

  const highestImpactLabel =
    skillGap?.learningPath?.label ||
    "Highest impact";

  const learningDescription =
    skillGap?.learningPath?.description ||
    "Follow the recommended learning path based on your resume.";

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        active="skills"
        onNavigate={onNavigate}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Skill gap analysis
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                Your detected skills compared with what{" "}
                {targetRole} hiring expects.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-8">
              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(e.target.value)
                }
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
              >
                <option>AI Engineer</option>
                <option>Java Backend Developer</option>
                <option>Data Analyst</option>
                <option>Frontend Developer</option>
                <option>Full-stack Developer</option>
                <option>Cloud Engineer</option>
              </select>

              <button
                onClick={() =>
                  onNavigate("roadmap")
                }
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Generate roadmap →
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 grid grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="col-span-2">
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  Skill comparison
                </h3>

                <span className="text-xs text-gray-400">
                  {skills.length} skills mapped from your resume
                </span>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {[
                      "Skill",
                      "Current",
                      "Required",
                      "Gap",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {skills.length > 0 ? (
                    skills.map((s, i) => (
                      <tr
                        key={`${s.skill}-${i}`}
                        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                          i === skills.length - 1
                            ? "border-0"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-3 text-sm font-medium text-gray-800">
                          {s.skill}
                        </td>

                        <td className="px-5 py-3">
                          <span
                            className={`text-xs font-medium ${getCurrentColor(
                              s.current
                            )}`}
                          >
                            {s.current}
                          </span>
                        </td>

                        <td className="px-5 py-3 text-xs text-gray-500">
                          {s.required}
                        </td>

                        <td className="px-5 py-3">
                          <span
                            className={`text-xs font-semibold ${getGapColor(
                              s.gap
                            )}`}
                          >
                            {s.gap}
                          </span>
                        </td>

                        <td className="px-5 py-3">
                          <button
                            className={`text-xs font-semibold ${getActionColor(
                              s.action
                            )} hover:underline`}
                          >
                            {s.action}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-10 text-center text-sm text-gray-400"
                      >
                        No skill gap analysis available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Legend */}
              <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-4">
                <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  High — blocks shortlisting for this role
                </span>

                <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  Medium — expected, learn within 3 months
                </span>

                <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  No gap — keep it on the journey
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Role card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">
                  {targetRole}
                </h3>

                <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                  ↑ {demand}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                This role profile was used to score your resume
                and rank these gaps.
              </p>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-5">
                <div>
                  <p className="text-[10px] text-gray-400">
                    Required skills
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {requiredSkillsCount} mapped
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">
                    Your match
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {matchPercentage}%
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">
                    Typical stack
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {typicalStack}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">
                    Hiring focus
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {hiringFocus}
                  </p>
                </div>
              </div>

              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Core Competencies
              </p>

              <div className="flex flex-wrap gap-1.5">
                {coreCompetencies.length > 0 ? (
                  coreCompetencies.map((c, i) => (
                    <span
                      key={`${c}-${i}`}
                      className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">
                    No competencies detected.
                  </span>
                )}
              </div>
            </div>

            {/* Gap projection */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                If you close the top gaps
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="text-center flex-shrink-0">
                  <p className="text-[10px] text-gray-400">
                    Readiness now
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    {readinessNow}%
                  </p>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{
                        width: `${readinessNow}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="text-gray-400 text-xs">
                      →
                    </span>
                  </div>

                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{
                        width: `${readinessAfter}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-center flex-shrink-0">
                  <p className="text-[10px] text-gray-400">
                    After roadmap
                  </p>

                  <p className="text-2xl font-bold text-green-600">
                    {readinessAfter}%
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                {topGapExplanation}
              </p>
            </div>

            {/* Learning path */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  {highestImpact}
                </h3>

                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-semibold">
                  {highestImpactLabel}
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                {learningDescription}
              </p>

              <div className="space-y-1.5 mb-4">
                {mlTopics.length > 0 ? (
                  mlTopics.map((topic, i) => (
                    <p
                      key={`${topic}-${i}`}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-red-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      </span>

                      {topic}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No learning path generated yet.
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  onNavigate("roadmap")
                }
                className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                Open learning path →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}