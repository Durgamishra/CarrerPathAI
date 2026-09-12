import Sidebar from "./Sidebar";

const skills = [
  {
    skill: "Python",
    current: "Detected",
    currentColor: "text-green-600",
    required: "Required",
    gap: "No gap",
    gapColor: "text-green-600",
    action: "Strengthen",
    actionColor: "text-blue-600",
  },
  {
    skill: "SQL",
    current: "Detected",
    currentColor: "text-green-600",
    required: "Required",
    gap: "No gap",
    gapColor: "text-green-600",
    action: "Strengthen",
    actionColor: "text-blue-600",
  },
  {
    skill: "Git & GitHub",
    current: "Detected",
    currentColor: "text-green-600",
    required: "Required",
    gap: "No gap",
    gapColor: "text-green-600",
    action: "Strengthen",
    actionColor: "text-blue-600",
  },
  {
    skill: "Pandas & NumPy",
    current: "Partial",
    currentColor: "text-amber-500",
    required: "Required",
    gap: "Low",
    gapColor: "text-amber-500",
    action: "Learn",
    actionColor: "text-red-500",
  },
  {
    skill: "Machine Learning",
    current: "Missing",
    currentColor: "text-gray-400",
    required: "Required",
    gap: "High",
    gapColor: "text-red-600",
    action: "Learn",
    actionColor: "text-red-500",
  },
  {
    skill: "Deep Learning",
    current: "Missing",
    currentColor: "text-gray-400",
    required: "Required",
    gap: "High",
    gapColor: "text-red-600",
    action: "Learn",
    actionColor: "text-red-500",
  },
  {
    skill: "Statistics",
    current: "Missing",
    currentColor: "text-gray-400",
    required: "Required",
    gap: "Medium",
    gapColor: "text-amber-600",
    action: "Learn",
    actionColor: "text-red-500",
  },
  {
    skill: "RAG & LLM apps",
    current: "Missing",
    currentColor: "text-gray-400",
    required: "Preferred",
    gap: "Medium",
    gapColor: "text-amber-600",
    action: "Learn",
    actionColor: "text-red-500",
  },
];

const coreCompetencies = [
  "Machine Learning",
  "Deep Learning",
  "SQL",
  "Model deployment",
];

const mlTopics = [
  "5 topics, regression to model evaluation",
  "Practice set with 12 guided exercises",
  "Project: student performance prediction",
];

export default function SkillGaps({ onNavigate }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar active="skills" onNavigate={onNavigate} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Skill gap analysis
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                Your detected skills compared with what AI Engineer hiring
                expects in 2026.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-8">
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer">
                <option>AI Engineer</option>
                <option>Java Backend Developer</option>
                <option>Data Analyst</option>
                <option>Frontend Developer</option>
                <option>Full-stack Developer</option>
                <option>Cloud Engineer</option>
              </select>

              <button
                onClick={() => onNavigate("roadmap")}
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Generate roadmap →
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 grid grid-cols-3 gap-6">
          {/* Left 2 columns: Skill table */}
          <div className="col-span-2">
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  Skill comparison
                </h3>

                <span className="text-xs text-gray-400">
                  9 skills mapped from your resume
                </span>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Skill", "Current", "Required", "Gap", "Action"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider first:pl-5"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {skills.map((s, i) => (
                    <tr
                      key={s.skill}
                      className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                        i === skills.length - 1 ? "border-0" : ""
                      }`}
                    >
                      <td className="px-5 py-3 text-sm font-medium text-gray-800">
                        {s.skill}
                      </td>

                      <td className="px-5 py-3">
                        <span
                          className={`text-xs font-medium ${s.currentColor}`}
                        >
                          {s.current}
                        </span>
                      </td>

                      <td className="px-5 py-3 text-xs text-gray-500">
                        {s.required}
                      </td>

                      <td className="px-5 py-3">
                        <span
                          className={`text-xs font-semibold ${s.gapColor}`}
                        >
                          {s.gap}
                        </span>
                      </td>

                      <td className="px-5 py-3">
                        <button
                          className={`text-xs font-semibold ${s.actionColor} hover:underline`}
                        >
                          {s.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Legend */}
              <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-4">
                {[
                  {
                    color: "bg-red-600",
                    label: "High — blocks shortlisting for this role",
                  },
                  {
                    color: "bg-amber-500",
                    label: "Medium — expected, learn within 3 months",
                  },
                  {
                    color: "bg-green-500",
                    label: "No gap — keep it on the journey",
                  },
                ].map(({ color, label }) => (
                  <span
                    key={label}
                    className="text-[10px] text-gray-500 flex items-center gap-1.5"
                  >
                    <span
                      className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}
                    />

                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Role card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">
                  AI Engineer
                </h3>

                <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2">
                  ↑ High demand
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                This role profile was used to score your resume and rank these
                gaps.
              </p>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-5">
                {[
                  ["Required skills", "12 mapped"],
                  ["Your match", "58%"],
                  ["Typical stack", "PyTorch, Docker"],
                  ["Hiring focus", "Projects + fundamentals"],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400">
                      {label}
                    </p>

                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {val}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Core Competencies
              </p>

              <div className="flex flex-wrap gap-1.5">
                {coreCompetencies.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
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
                    68%
                  </p>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: "68%" }}
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
                      style={{ width: "84%" }}
                    />
                  </div>
                </div>

                <div className="text-center flex-shrink-0">
                  <p className="text-[10px] text-gray-400">
                    After roadmap
                  </p>

                  <p className="text-2xl font-bold text-green-600">
                    84%
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                Closing Machine Learning, Deep Learning and Statistics adds
                about 16 points.
              </p>
            </div>

            {/* Start with ML */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Start with ML
                </h3>

                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2">
                  Highest impact
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                Appears in 8 of 10 AI Engineer postings for freshers.
              </p>

              <div className="space-y-1.5 mb-4">
                {mlTopics.map((topic) => (
                  <p
                    key={topic}
                    className="text-xs text-gray-600 flex items-start gap-2"
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-red-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </span>

                    {topic}
                  </p>
                ))}
              </div>

              <button className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors flex items-center gap-1">
                Open learning path →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}