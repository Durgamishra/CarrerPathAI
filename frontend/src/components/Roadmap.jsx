import Sidebar from "./Sidebar";

const roadmapLevels = [
  {
    level: "LEVEL 01",
    title: "Python & Data Foundations",
    duration: "2 weeks",
    status: "Recommended",
    statusColor: "bg-red-50 text-red-600",
    description:
      "Strengthen the Python and data-handling foundations required for machine learning workflows.",
    topics: [
      "Python functions, modules and OOP",
      "NumPy arrays and operations",
      "Pandas DataFrames and data cleaning",
      "Data visualization with Matplotlib",
    ],
    project: "Project: Student performance data analysis",
  },
  {
    level: "LEVEL 02",
    title: "Machine Learning Fundamentals",
    duration: "4 weeks",
    status: "High impact",
    statusColor: "bg-amber-50 text-amber-600",
    description:
      "Learn the core machine learning concepts needed to build and evaluate predictive models.",
    topics: [
      "Supervised and unsupervised learning",
      "Regression and classification",
      "Feature engineering",
      "Model evaluation and validation",
    ],
    project: "Project: Student performance prediction",
  },
  {
    level: "LEVEL 03",
    title: "Deep Learning",
    duration: "4 weeks",
    status: "High impact",
    statusColor: "bg-amber-50 text-amber-600",
    description:
      "Move from traditional machine learning into neural networks and modern deep learning workflows.",
    topics: [
      "Neural network fundamentals",
      "PyTorch basics",
      "Training and validation",
      "CNNs and model optimization",
    ],
    project: "Project: Image classification system",
  },
  {
    level: "LEVEL 04",
    title: "LLM & RAG Applications",
    duration: "3 weeks",
    status: "Preferred",
    statusColor: "bg-blue-50 text-blue-600",
    description:
      "Build practical AI applications using large language models, embeddings and retrieval.",
    topics: [
      "LLM fundamentals",
      "Prompt engineering",
      "Embeddings and vector databases",
      "RAG architecture",
    ],
    project: "Project: AI PDF question-answering assistant",
  },
  {
    level: "LEVEL 05",
    title: "Deployment & AI Engineering",
    duration: "3 weeks",
    status: "Career ready",
    statusColor: "bg-green-50 text-green-600",
    description:
      "Turn your AI models into production-ready applications and prepare for AI Engineer roles.",
    topics: [
      "FastAPI model serving",
      "Docker fundamentals",
      "REST API integration",
      "Cloud deployment basics",
    ],
    project: "Project: Deploy an end-to-end AI application",
  },
];

const dailyTasks = [
  "Complete one machine learning concept",
  "Solve 2 guided Python/ML exercises",
  "Spend 30 minutes improving your project",
  "Write down one concept you learned today",
];

export default function Roadmap({ onNavigate }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar active="roadmap" onNavigate={onNavigate} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                PERSONALIZED CAREER ROADMAP
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                Your AI Engineer roadmap
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                A 16-week learning path generated from your resume and skill
                gaps.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("skills")}
                className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← Skill gaps
              </button>

              <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                Start roadmap →
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Target role
              </p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                AI Engineer
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Current readiness
              </p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                68%
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Roadmap length
              </p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                16 weeks
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Expected readiness
              </p>
              <p className="text-lg font-bold text-green-600 mt-1">
                84%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Roadmap */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Learning path
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    Complete each level to increase your career readiness.
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  0 / 5 levels completed
                </span>
              </div>

              <div className="space-y-4">
                {roadmapLevels.map((level, index) => (
                  <div
                    key={level.level}
                    className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Level number */}
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                              {level.level}
                            </p>

                            <h3 className="text-base font-semibold text-gray-900 mt-1">
                              {level.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${level.statusColor}`}
                            >
                              {level.status}
                            </span>

                            <span className="text-[10px] text-gray-400">
                              {level.duration}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed mt-3">
                          {level.description}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                          {level.topics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-start gap-2"
                            >
                              <span className="text-green-500 text-xs mt-0.5">
                                ✓
                              </span>

                              <span className="text-[11px] text-gray-600">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-[11px] font-medium text-gray-700">
                            {level.project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Readiness */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Career readiness
                </h3>

                <p className="text-[11px] text-gray-400 mt-1 mb-5">
                  Your projected readiness as you complete the roadmap.
                </p>

                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-gray-900">
                    68%
                  </span>

                  <span className="text-xs text-gray-400 mb-1">
                    current
                  </span>
                </div>

                <div className="bg-gray-100 rounded-full h-2 mb-3">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>

                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">
                    Current
                  </span>

                  <span className="text-[10px] text-green-600 font-semibold">
                    84% projected
                  </span>
                </div>

                <div className="mt-5 p-3 bg-green-50 rounded-lg">
                  <p className="text-[11px] text-green-700 leading-relaxed">
                    Closing your top three skill gaps can significantly improve
                    your readiness for AI Engineer roles.
                  </p>
                </div>
              </div>

              {/* Today's tasks */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Today's tasks
                  </h3>

                  <span className="text-[10px] text-gray-400">
                    0 / 4
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 mb-4">
                  Small daily actions keep the roadmap moving.
                </p>

                <div className="space-y-3">
                  {dailyTasks.map((task) => (
                    <label
                      key={task}
                      className="flex items-start gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 w-3.5 h-3.5 accent-red-600 cursor-pointer"
                      />

                      <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                        {task}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recommended project */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Recommended next project
                  </h3>

                  <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-semibold">
                    High impact
                  </span>
                </div>

                <h4 className="text-sm font-medium text-gray-800 mt-3">
                  Student performance prediction
                </h4>

                <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
                  Build a machine learning model that predicts student
                  performance from academic and behavioral data.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Python", "Pandas", "NumPy", "Scikit-learn"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <button className="text-xs font-semibold text-gray-900 hover:text-red-600 mt-4 transition-colors">
                  View project plan →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
