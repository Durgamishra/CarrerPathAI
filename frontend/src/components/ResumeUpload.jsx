import Sidebar from "./Sidebar";

const validationItems = [
  { status: "pass", label: "PDF format supported" },
  { status: "pass", label: "Under the 5 MB file limit" },
  { status: "pass", label: "Readable text detected — 248 KB extracted" },
  { status: "warn", label: "Detected as a resume — 92% confidence" },
];

const extractionItems = [
  { label: "Text extraction", status: "Done" },
  { label: "Section detection", status: "Done" },
  { label: "Skill recognition", status: "Running" },
  { label: "AI scoring against target role", status: "Queued" },
];

export default function ResumeUpload({ onNavigate }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar active="upload" onNavigate={onNavigate} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Upload & review your resume
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                We extract your text and detect every section first — you
                confirm the parsed data before the AI analyses it.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-8">
              <button className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                ↺ Re-upload
              </button>

              <button
                onClick={() => onNavigate("report")}
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Confirm & analyse →
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 grid grid-cols-2 gap-6">
          {/* Left: Upload + validation */}
          <div className="space-y-4">
            {/* Drop zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-gray-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 14V2M11 2L7 6M11 2L15 6"
                    stroke="#DC2626"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 15v3a2 2 0 002 2h12a2 2 0 002-2v-3"
                    stroke="#DC2626"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="font-semibold text-gray-800 mb-1">
                Drop your resume here
              </p>

              <p className="text-xs text-gray-400 mb-5">
                PDF or DOCX · up to 5 MB · 3 pages recommended for best parsing
              </p>

              <button className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-gray-600">
                Browse files
              </button>
            </div>

            {/* Uploaded file */}
            <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-[10px] font-bold">
                  PDF
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Aarav_Sharma_Resume_2026.pdf
                </p>

                <p className="text-xs text-gray-400">
                  2 pages · 248 KB · uploaded just now
                </p>
              </div>

              <button className="text-gray-300 hover:text-gray-500 transition-colors text-sm flex-shrink-0">
                ✕
              </button>
            </div>

            {/* File validation */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">
                  File validation
                </p>

                <span className="text-xs text-gray-400">
                  3 passed · 1 warning
                </span>
              </div>

              <div className="px-4 py-3 space-y-2.5">
                {validationItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-2.5"
                  >
                    {item.status === "pass" ? (
                      <span className="text-green-500 mt-0.5 text-sm flex-shrink-0">
                        ✓
                      </span>
                    ) : (
                      <span className="text-amber-500 mt-0.5 text-sm flex-shrink-0">
                        ⚠
                      </span>
                    )}

                    <span
                      className={`text-sm ${
                        item.status === "warn"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Extraction */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">
                  AI extraction
                </p>

                <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                  <span className="animate-spin inline-block">↺</span>
                  Running
                </span>
              </div>

              <div className="px-4 py-3 space-y-2.5">
                {extractionItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.status === "Done" ? (
                        <span className="text-green-500 text-sm flex-shrink-0">
                          ✓
                        </span>
                      ) : item.status === "Running" ? (
                        <span className="text-red-500 text-sm flex-shrink-0 animate-spin inline-block">
                          ↺
                        </span>
                      ) : (
                        <span className="text-gray-300 text-sm flex-shrink-0">
                          ○
                        </span>
                      )}

                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        item.status === "Done"
                          ? "text-green-500"
                          : item.status === "Running"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}

                <div className="mt-3 pt-1">
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: "72%" }}
                    />
                  </div>

                  <div className="flex justify-between mt-1.5">
                    <p className="text-xs text-gray-400">
                      Parsing sections — about 8 seconds remaining.
                    </p>

                    <p className="text-xs font-semibold text-gray-700">
                      72%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Parsed resume preview */}
          <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-start px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Parsed resume preview
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Review each detected section — edit anything that looks
                  wrong before analysis.
                </p>
              </div>

              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-xs text-gray-400">
                  8 sections · 24 fields
                </p>

                <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mt-0.5 ml-auto">
                  ✎ Edit parsed data
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                {/* Personal info */}
                <Section title="Personal information">
                  <Fields
                    items={[
                      ["Name", "Aarav Sharma"],
                      ["Email", "aarav.sharma@gmail.com"],
                      ["Phone", "+91 98220 41138"],
                      ["Location", "Pune, Maharashtra"],
                      ["Links", "github.com/aaravsharma"],
                    ]}
                    labelWidth="w-16"
                  />
                </Section>

                {/* Projects */}
                <Section title="Projects">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-800">
                      Student Management System
                    </p>

                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Java · Spring Boot · MySQL · team of 3
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                      Record management dashboard with attendance tracking and
                      role-based login.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Expense Tracker Web App
                    </p>

                    <p className="text-[10px] text-gray-400 mt-0.5">
                      HTML · CSS · JavaScript · LocalStorage
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                      Monthly spending tracker with category filters and a
                      budget summary chart.
                    </p>
                  </div>
                </Section>

                {/* Education */}
                <Section title="Education">
                  <Fields
                    items={[
                      ["Degree", "BCA — Computer Applications"],
                      ["Institution", "Savitribai Phule Pune University"],
                      ["Duration", "2023 – 2026"],
                      ["Score", "CGPA 8.4 / 10"],
                    ]}
                    labelWidth="w-20"
                  />
                </Section>

                {/* Experience */}
                <Section title="Experience">
                  <p className="text-xs font-semibold text-gray-800">
                    Web Development Intern
                  </p>

                  <p className="text-[10px] text-gray-400 mt-0.5">
                    TechNova Solutions · Jun – Aug 2025 · Pune
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                    Built CRUD modules for the internal admin panel and wrote
                    API test cases.
                  </p>
                </Section>

                {/* Skills */}
                <Section title="Skills detected">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Python",
                      "SQL",
                      "Java",
                      "Pandas",
                      "JavaScript",
                      "Git",
                      "Excel",
                    ].map((s) => (
                      <span
                        key={s}
                        className="text-[10px] border border-gray-200 rounded px-2 py-0.5 text-gray-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* Certifications */}
                <Section title="Certifications">
                  {[
                    ["Oracle Java Foundations", "Oracle, 2024"],
                    ["Meta Front-End Basics", "Coursera, 2025"],
                  ].map(([name, src]) => (
                    <div
                      key={name}
                      className="flex items-start gap-1.5 mb-2"
                    >
                      <span className="text-red-400 text-[8px] mt-1 flex-shrink-0">
                        ⬤
                      </span>

                      <div>
                        <p className="text-xs text-gray-800">{name}</p>
                        <p className="text-[10px] text-gray-400">{src}</p>
                      </div>
                    </div>
                  ))}
                </Section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex justify-between items-center mb-2.5">
        <p className="text-xs font-semibold text-gray-700">{title}</p>

        <button className="text-[10px] text-red-500 hover:underline font-medium">
          Edit
        </button>
      </div>

      {children}
    </div>
  );
}

function Fields({ items, labelWidth }) {
  return (
    <div className="space-y-1.5">
      {items.map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <span
            className={`text-[10px] text-gray-400 flex-shrink-0 ${labelWidth}`}
          >
            {k}
          </span>

          <span className="text-[10px] text-gray-700 leading-relaxed">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}