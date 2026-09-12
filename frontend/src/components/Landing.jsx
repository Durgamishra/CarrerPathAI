const scoreCategories = [
  { label: "ATS Compatibility", score: 82 },
  { label: "Skills match", score: 76 },
  { label: "Projects", score: 70 },
  { label: "Content quality", score: 75 },
];

const steps = [
  {
    step: "STEP 01",
    title: "Upload & parse",
    desc: "Drop a PDF or DOCX. We extract the text, detect each resume section, and let you confirm the parsed data before anything is scored.",
    bullets: ["PDF or DOCX, up to 5 MB", "Section-by-section review"],
  },
  {
    step: "STEP 02",
    title: "AI diagnosis",
    desc: "Seven categories are scored out of 100. ATS rules are tested, and weak sentences are rewritten with stronger, role-specific wording.",
    bullets: ["Category + ATS scoring", "Line-level corrections"],
  },
  {
    step: "STEP 03",
    title: "Personalized roadmap",
    desc: "Your target role defines the gaps. The roadmap turns them into levels, projects, and daily tasks, and tracks a readiness score as you finish them.",
    bullets: ["5-level plan per role", "Readiness score tracking"],
  },
];

export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded-sm" />
              <span className="font-semibold text-gray-900 text-sm">
                CareerPath AI
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                "How it works",
                "Resume analysis",
                "Skill gaps",
                "Roadmap",
                "For students",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Log in
            </button>

            <button
              onClick={() => onNavigate("upload")}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Get started free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-6 tracking-wider">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              AI CAREER PLATFORM FOR STUDENTS
            </span>

            <h1 className="text-4xl md:text-[2.65rem] font-extrabold text-gray-900 leading-[1.15] mb-5 tracking-tight">
              Know exactly what your resume is missing — and what to do next.
            </h1>

            <p className="text-gray-500 text-[15px] mb-8 leading-relaxed max-w-md">
              CareerPath AI scores your resume, checks ATS compatibility,
              pinpoints the skill gaps for your target role, and converts them
              into a week-by-week roadmap that ends in placement readiness.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate("upload")}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Analyze my resume →
              </button>

              <button
                onClick={() => onNavigate("report")}
                className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
              >
                See a sample report
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-12 pt-10 border-t border-gray-100">
              {[
                { val: "12,400+", label: "Resumes analysed" },
                {
                  val: "+17 pts",
                  label: "Average score lift after fixes",
                },
                {
                  val: "38 roles",
                  label: "Target role profiles mapped",
                },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-gray-900">{val}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Score card */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-medium text-gray-500">
                  Resume report · AI Engineer
                </p>
                <p className="text-xs text-gray-400">2 min ago</p>
              </div>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-7xl font-extrabold text-gray-900 leading-none">
                  78
                </span>
                <span className="text-gray-400 text-xl mb-1.5">/100</span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full mb-5 font-medium">
                ↑ +17 vs last version
              </span>

              <div className="space-y-3">
                {scoreCategories.map((cat) => (
                  <div
                    key={cat.label}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-gray-500 w-34 flex-shrink-0">
                      {cat.label}
                    </span>

                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-red-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>

                    <span className="text-xs font-semibold text-gray-700 w-5 text-right">
                      {cat.score}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  3 priority fixes detected
                </span>

                <button
                  onClick={() => onNavigate("report")}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Open full report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark stats bar */}
      <section className="bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              val: "61 → 84",
              label: "Average resume score before vs after AI corrections",
            },
            {
              val: "10-30 sec",
              label: "Typical AI analysis time per resume",
            },
            {
              val: "5 levels",
              label: "Roadmap from foundations to placement",
            },
            {
              val: "7 checks",
              label: "ATS rules evaluated on every upload",
            },
          ].map(({ val, label }) => (
            <div key={val}>
              <p className="text-xl font-bold text-white">{val}</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          HOW IT WORKS
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          From resume to roadmap in three steps
        </h2>

        <p className="text-gray-500 text-sm mb-10">
          No generic tips. Every step produces something you can act on today.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                {s.step}
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                {s.title}
              </h3>

              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                {s.desc}
              </p>

              <div className="space-y-1.5">
                {s.bullets.map((b) => (
                  <p
                    key={b}
                    className="text-xs text-gray-500 flex items-center gap-2"
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-red-300 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </span>
                    {b}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature callouts */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Built for students preparing for placements
            </h3>

            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              If your resume was never reviewed by a recruiter, this is the
              fastest way to find out what is holding it back.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {[
                "BCA",
                "B.Tech CS/IT",
                "MCA",
                "Final-year students",
                "Freshers",
                "Beginner career switchers",
              ].map((t) => (
                <span
                  key={t}
                  className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full border border-red-300 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              </span>
              Free for students — no credit card, no subscription.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Target roles mapped inside the product
            </h3>

            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Each role profile carries its own required skills, gap
              priorities, and roadmap levels.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "AI Engineer", active: true },
                { label: "Java Backend Developer", active: false },
                { label: "Data Analyst", active: false },
                { label: "Frontend Developer", active: false },
                { label: "Full-stack Developer", active: false },
                { label: "Cloud Engineer", active: false },
              ].map(({ label, active }) => (
                <span
                  key={label}
                  className={`text-xs border rounded px-2 py-1 ${
                    active
                      ? "border-red-200 bg-red-50 text-red-700 font-medium"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}