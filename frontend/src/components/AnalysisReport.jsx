import Sidebar from "./Sidebar";

const categories = [
  { label: "ATS compatibility", score: 82 },
  { label: "Skills", score: 76 },
  { label: "Projects", score: 70 },
  { label: "Education", score: 90 },
  { label: "Experience", score: 60 },
  { label: "Content quality", score: 75 },
  { label: "Formatting", score: 85 },
];

const atsItems = [
  {
    icon: "✓",
    color: "text-green-500",
    text: "Standard section headings",
    detail:
      "Education, Skills, Projects and Experience are all detected correctly.",
  },
  {
    icon: "✓",
    color: "text-green-500",
    text: "Relevant technical keywords present",
    detail:
      "Python, SQL and Java all match what AI Engineer postings ask for.",
  },
  {
    icon: "✓",
    color: "text-green-500",
    text: "No tables or multi-column blocks",
    detail:
      "Text flows in a single column, so parsers read it in the right order.",
  },
  {
    icon: "⚠",
    color: "text-amber-500",
    text: "Project bullets lack action keywords",
    detail:
      "Add terms like REST API, CRUD, deployment and data pipeline.",
  },
  {
    icon: "⚠",
    color: "text-amber-500",
    text: "Target-role keywords missing",
    detail:
      "Machine Learning and Deep Learning never appear anywhere in this file.",
  },
  {
    icon: "✕",
    color: "text-red-600",
    text: "Contact details sit inside a header graphic",
    detail:
      "Date parsers may skip the block entirely — move it to plain text.",
  },
];

const fixes = [
  {
    n: 1,
    title: "Rewrite project bullets with measurable outcomes",
    impact: "High impact",
    detail:
      "Both projects say what was built but not your role, the stack depth, or the outcome.",
  },
  {
    n: 2,
    title: "Add the missing ML keywords",
    impact: "High impact",
    detail:
      "AI Engineer postings expect Machine Learning and Deep Learning near your projects.",
  },
  {
    n: 3,
    title: "Trim the skills list to role-relevant tools",
    impact: "Medium impact",
    detail:
      "Excel and CSS dilute the technical signal you want for this role.",
  },
];

const strengths = [
  "8.4 CGPA with a clear graduation timeline",
  "Two academic projects with repository links",
  "Single-page layout that parsers read cleanly",
  "Internship listed with company, role and dates",
  "Skills grouped by language, tool and database",
];

const corrections = [
  {
    section: "Project description",
    current: "Made a student management system using Java.",
    rec: "Developed a Java-based Student Management System with CRUD operations for 500+ student records, exposed via REST APIs.",
  },
  {
    section: "Skills section",
    current:
      "Skills: Python, SQL, HTML, CSS, JavaScript, Git, Excel",
    rec: "Skills: Python (Pandas, NumPy), SQL, Java, Git — grouped by language, database and tool.",
  },
  {
    section: "Experience bullet",
    current: "Worked on admin panel during internship.",
    rec: "Built 6 CRUD modules for the internal admin panel and wrote API test cases, cutting manual data entry time by roughly 40%.",
  },
];

export default function AnalysisReport({ onNavigate }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar active="upload" onNavigate={onNavigate} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resume analysis report
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                Aarav_Sharma_Resume_2026.pdf · target role AI Engineer ·
                analysed 2 minutes ago
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0 ml-8">
              <button className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                ↺ Re-run analysis
              </button>

              <button className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                ↓ Download PDF
              </button>

              <button
                onClick={() => onNavigate("skills")}
                className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Next: skill gaps →
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Overall score */}
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                OVERALL RESUME SCORE
              </p>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-8xl font-extrabold text-gray-900 leading-none">
                  78
                </span>

                <span className="text-gray-400 text-2xl mb-2">
                  /100
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                  ↑ +17 as v1
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium">
                  AI Engineer
                </span>

                <span className="text-xs text-gray-400">
                  2 min ago
                </span>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                Above average for freshers. Education carries the score —
                project wording is the biggest drag.
              </p>
            </div>

            {/* Category breakdown */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-3">
                Category breakdown
              </p>

              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">
                        {cat.label}
                      </span>

                      <span className="text-xs font-semibold text-gray-700">
                        {cat.score}
                      </span>
                    </div>

                    <div className="bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-red-600 h-1.5 rounded-full"
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 2 columns */}
          <div className="col-span-2 space-y-5">
            {/* ATS Compatibility */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-900">
                  ATS compatibility
                </h3>

                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-gray-900">
                    82
                  </span>

                  <span className="text-sm text-gray-400">
                    /100
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                How well an applicant tracking system reads, parses, and
                ranks your resume.
              </p>

              <div className="space-y-3">
                {atsItems.map((item) => (
                  <div key={item.text} className="flex gap-2.5">
                    <span
                      className={`text-sm flex-shrink-0 mt-0.5 ${item.color}`}
                    >
                      {item.icon}
                    </span>

                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {item.text}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority fixes + Strengths */}
            <div className="grid grid-cols-2 gap-4">
              {/* Priority fixes */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Priority fixes
                  </h3>

                  <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                    3 actions
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 mb-4">
                  Do these first — they move the score the most for an AI
                  Engineer role.
                </p>

                <div className="space-y-4">
                  {fixes.map((fix) => (
                    <div key={fix.n} className="flex gap-2.5">
                      <div className="w-5 h-5 bg-gray-900 text-white rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {fix.n}
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-800 mb-1">
                          {fix.title}
                        </p>

                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            fix.impact === "High impact"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {fix.impact}
                        </span>

                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                          {fix.detail}
                        </p>

                        <button className="text-[10px] text-red-500 hover:underline mt-0.5">
                          Fix in resume editor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Strengths to keep
                  </h3>

                  <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                    5 keepers
                  </span>
                </div>

                <div className="space-y-2.5">
                  {strengths.map((s) => (
                    <div key={s} className="flex gap-2.5">
                      <span className="text-green-500 text-sm flex-shrink-0">
                        ✓
                      </span>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line-level corrections */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Line-level corrections
                </h3>

                <button className="text-xs text-red-500 hover:underline font-medium">
                  View all suggestions
                </button>
              </div>

              <p className="text-[11px] text-gray-400 mb-4">
                Rewrite these exactly as suggested — the wording is tuned
                to AI Engineer postings.
              </p>

              <div className="grid grid-cols-3 gap-5">
                {corrections.map((c) => (
                  <div key={c.section}>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {c.section}
                    </p>

                    <p className="text-[9px] font-semibold text-gray-400 mb-1">
                      CURRENT
                    </p>

                    <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                      {c.current}
                    </p>

                    <p className="text-[9px] font-semibold text-red-500 mb-1">
                      AI RECOMMENDATION
                    </p>

                    <p className="text-[11px] text-gray-700 mb-3 leading-relaxed">
                      {c.rec}
                    </p>

                    <button className="text-[10px] text-white bg-gray-900 px-2.5 py-1 rounded hover:bg-gray-700 transition-colors font-medium">
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}