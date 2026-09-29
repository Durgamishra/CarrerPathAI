import { useState } from "react";
import Sidebar from "./Sidebar";

const initialValidation = [
  {
    id: "format",
    label: "PDF format supported",
    passed: false,
  },
  {
    id: "size",
    label: "Under the 5 MB file limit",
    passed: false,
  },
  {
    id: "selected",
    label: "PDF selected successfully",
    passed: false,
  },
];

const extractionSteps = [
  {
    id: "text",
    label: "Text extraction",
  },
  {
    id: "sections",
    label: "Section detection",
  },
  {
    id: "skills",
    label: "Skill recognition",
  },
  {
    id: "scoring",
    label: "AI scoring against target role",
  },
];

export default function ResumeUpload({ onNavigate }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [validation, setValidation] =
    useState(initialValidation);

  const [stepStatus, setStepStatus] = useState(
    extractionSteps.map((step) => ({
      ...step,
      status: "waiting",
    }))
  );

  const [progress, setProgress] = useState(0);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisComplete, setAnalysisComplete] =
    useState(false);

  const [error, setError] = useState("");

  const [parsedResume, setParsedResume] =
    useState(null);

  // --------------------------------
  // FILE UPLOAD
  // --------------------------------

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setError("");
    setAnalysisComplete(false);
    setParsedResume(null);
    setProgress(0);

    setStepStatus(
      extractionSteps.map((step) => ({
        ...step,
        status: "waiting",
      }))
    );

    // -----------------------------
    // VALIDATION
    // -----------------------------

    const isPDF =
      file.type === "application/pdf";

    const isUnderLimit =
      file.size <= 5 * 1024 * 1024;

    setSelectedFile(file);

    setValidation([
      {
        id: "format",
        label: "PDF format supported",
        passed: isPDF,
      },
      {
        id: "size",
        label: "Under the 5 MB file limit",
        passed: isUnderLimit,
      },
      {
        id: "selected",
        label: "PDF selected successfully",
        passed: true,
      },
    ]);

    if (!isPDF) {
      setSelectedFile(null);

      setError(
        "Only PDF files are supported."
      );

      return;
    }

    if (!isUnderLimit) {
      setSelectedFile(null);

      setError(
        "File size must be under 5 MB."
      );

      return;
    }

    // -----------------------------
    // START AI AUTOMATICALLY
    // -----------------------------

    await startAnalysis(file);
  };

  // --------------------------------
  // ANALYSIS
  // --------------------------------

  const startAnalysis = async (file) => {
    setIsAnalyzing(true);
    setProgress(0);

    setStepStatus(
      extractionSteps.map((step) => ({
        ...step,
        status: "waiting",
      }))
    );

    const formData = new FormData();

    formData.append("resume", file);

    // --------------------------------
    // PROGRESS ANIMATION
    // --------------------------------

    let animationProgress = 0;

    const progressInterval = setInterval(() => {
      animationProgress += 1;

      if (animationProgress <= 90) {
        setProgress(animationProgress);
      }

      // Text extraction
      if (animationProgress >= 5) {
        updateStep("text", "running");
      }

      if (animationProgress >= 25) {
        updateStep("text", "done");
      }

      // Section detection
      if (animationProgress >= 28) {
        updateStep("sections", "running");
      }

      if (animationProgress >= 50) {
        updateStep("sections", "done");
      }

      // Skill recognition
      if (animationProgress >= 53) {
        updateStep("skills", "running");
      }

      if (animationProgress >= 75) {
        updateStep("skills", "done");
      }

      // AI scoring
      if (animationProgress >= 78) {
        updateStep("scoring", "running");
      }
    }, 100);

    try {
      // --------------------------------
      // SEND TO BACKEND
      // --------------------------------

      const response = await fetch(
        "https://carrer-path-ai-ykiy.vercel.app/api/resume/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to analyze resume."
        );
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      clearInterval(progressInterval);

      setProgress(100);

      setStepStatus(
        extractionSteps.map((step) => ({
          ...step,
          status: "done",
        }))
      );

      // AI result
      setParsedResume(data.analysis);

      // Save result
      sessionStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(data)
      );

      sessionStorage.setItem(
        "resumeFileName",
        file.name
      );

      setAnalysisComplete(true);
      setIsAnalyzing(false);

      console.log(
        "CareerPath AI Analysis:",
        data
      );
    } catch (err) {
      clearInterval(progressInterval);

      console.error(
        "Resume analysis error:",
        err
      );

      setIsAnalyzing(false);

      setError(
        err.message ||
          "Something went wrong while analyzing your resume."
      );
    }
  };

  // --------------------------------
  // UPDATE STEP
  // --------------------------------

  const updateStep = (id, status) => {
    setStepStatus((current) =>
      current.map((step) =>
        step.id === id
          ? {
              ...step,
              status,
            }
          : step
      )
    );
  };

  // --------------------------------
  // REMOVE FILE
  // --------------------------------

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setParsedResume(null);
    setProgress(0);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setError("");

    setValidation(initialValidation);

    setStepStatus(
      extractionSteps.map((step) => ({
        ...step,
        status: "waiting",
      }))
    );
  };

  // --------------------------------
  // RE-UPLOAD
  // --------------------------------

  const handleReupload = () => {
    document
      .getElementById("resume-input")
      ?.click();
  };

  const fileSize = selectedFile
    ? `${(
        selectedFile.size / 1024
      ).toFixed(0)} KB`
    : "";

  const passedValidation =
    validation.filter(
      (item) => item.passed
    ).length;

  return (
    <div className="flex h-screen bg-white overflow-hidden">

      <Sidebar
        active="upload"
        onNavigate={onNavigate}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}

        <div className="px-8 pt-8 pb-5 border-b border-gray-100">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Upload & review your resume
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                Upload your resume and CareerPath AI
                will automatically extract, analyze and
                prepare your career report.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={handleReupload}
                className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                ↺ Re-upload
              </button>

              <button
                disabled={!analysisComplete}
                onClick={() =>
                  onNavigate("report")
                }
                className={`text-sm px-4 py-2 rounded-md font-medium ${
                  analysisComplete
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {analysisComplete
                  ? "View analysis →"
                  : isAnalyzing
                  ? "Analysing..."
                  : "Waiting..."}
              </button>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="px-8 py-6 grid grid-cols-2 gap-6">

          {/* LEFT */}

          <div className="space-y-4">

            {/* UPLOAD */}

            <label
              htmlFor="resume-input"
              className="block border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-gray-300 transition-colors cursor-pointer"
            >

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

                {selectedFile
                  ? selectedFile.name
                  : "Drop your resume here"}

              </p>

              <p className="text-xs text-gray-400 mb-5">
                PDF · up to 5 MB · 3 pages recommended
                for best parsing
              </p>

              <span className="inline-block text-sm border border-gray-300 px-4 py-2 rounded-md text-gray-600">
                Browse files
              </span>

              <input
                id="resume-input"
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />

            </label>

            {/* ERROR */}

            {error && (
              <div className="border border-red-200 bg-red-50 rounded-lg px-4 py-3">

                <p className="text-sm text-red-600">
                  {error}
                </p>

              </div>
            )}

            {/* FILE */}

            {selectedFile && (
              <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3">

                <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">

                  <span className="text-red-600 text-[10px] font-bold">
                    PDF
                  </span>

                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedFile.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    PDF · {fileSize} ·{" "}
                    {isAnalyzing
                      ? "analysing..."
                      : analysisComplete
                      ? "analysis complete"
                      : "ready"}
                  </p>

                </div>

                <button
                  onClick={handleRemoveFile}
                  className="text-gray-300 hover:text-gray-500"
                >
                  ✕
                </button>

              </div>
            )}

            {/* VALIDATION */}

            <div className="border border-gray-200 rounded-xl overflow-hidden">

              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">

                <p className="text-sm font-semibold text-gray-700">
                  File validation
                </p>

                <span className="text-xs text-gray-400">
                  {passedValidation} passed
                </span>

              </div>

              <div className="px-4 py-3 space-y-2.5">

                {validation.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-start gap-2.5"
                  >

                    <span
                      className={`text-sm ${
                        item.passed
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    >
                      {item.passed
                        ? "✓"
                        : "○"}
                    </span>

                    <span
                      className={`text-sm ${
                        item.passed
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* AI EXTRACTION */}

            <div className="border border-gray-200 rounded-xl overflow-hidden">

              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">

                <p className="text-sm font-semibold text-gray-700">
                  AI extraction
                </p>

                <span
                  className={`text-xs font-medium ${
                    isAnalyzing
                      ? "text-red-500"
                      : analysisComplete
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {isAnalyzing
                    ? "Running"
                    : analysisComplete
                    ? "Complete"
                    : "Waiting"}
                </span>

              </div>

              <div className="px-4 py-3 space-y-3">

                {stepStatus.map((step) => (

                  <div
                    key={step.id}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-2.5">

                      {step.status === "done" ? (

                        <span className="text-green-500 text-sm">
                          ✓
                        </span>

                      ) : step.status === "running" ? (

                        <span className="text-red-500 text-sm animate-spin">
                          ◌
                        </span>

                      ) : (

                        <span className="text-gray-300 text-sm">
                          ○
                        </span>

                      )}

                      <span className="text-sm text-gray-600">
                        {step.label}
                      </span>

                    </div>

                    <span
                      className={`text-xs font-medium ${
                        step.status === "done"
                          ? "text-green-500"
                          : step.status === "running"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.status === "done"
                        ? "Done"
                        : step.status === "running"
                        ? "Running"
                        : "Queued"}
                    </span>

                  </div>

                ))}

                {/* PROGRESS */}

                <div className="pt-2">

                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">

                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2">

                    <p className="text-xs text-gray-400">

                      {isAnalyzing
                        ? "CareerPath AI is analysing your resume..."
                        : analysisComplete
                        ? "Resume analysis completed successfully."
                        : "Upload a resume to begin analysis."}

                    </p>

                    <p className="text-xs font-semibold text-gray-700">
                      {progress}%
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">

            <div className="flex justify-between items-start px-5 py-3.5 border-b border-gray-100">

              <div>

                <p className="text-sm font-semibold text-gray-900">
                  Parsed resume preview
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  CareerPath AI automatically updates
                  this preview from your resume.
                </p>

              </div>

              <div className="text-right">

                <p className="text-xs text-gray-400">
                  {analysisComplete
                    ? "AI Parsed"
                    : "Preview"}
                </p>

              </div>

            </div>

            <div className="overflow-y-auto flex-1">

              <div className="grid grid-cols-2 divide-x divide-gray-100">

                {/* PERSONAL */}

                <Section title="Personal information">

                  {parsedResume ? (

                    <Fields
                      items={[
                        [
                          "Name",
                          parsedResume.candidate?.name ||
                            "Not found",
                        ],
                        [
                          "Email",
                          parsedResume.candidate?.email ||
                            "Not found",
                        ],
                        [
                          "Phone",
                          parsedResume.candidate?.phone ||
                            "Not found",
                        ],
                        [
                          "Location",
                          parsedResume.candidate?.location ||
                            "Not found",
                        ],
                        [
                          "Links",
                          parsedResume.candidate?.links?.join(
                            ", "
                          ) || "None",
                        ],
                      ]}
                    />

                  ) : (

                    <EmptyText text="Upload a resume to extract personal information." />

                  )}

                </Section>

                {/* PROJECTS */}

                <Section title="Projects">

                  {parsedResume ? (

                    <ListData
                      items={
                        parsedResume.projects
                      }
                      type="project"
                    />

                  ) : (

                    <EmptyText text="Projects will appear here after AI analysis." />

                  )}

                </Section>

                {/* EDUCATION */}

                <Section title="Education">

                  {parsedResume ? (

                    <ListData
                      items={
                        parsedResume.education
                      }
                      type="education"
                    />

                  ) : (

                    <EmptyText text="Education details will be extracted from your resume." />

                  )}

                </Section>

                {/* EXPERIENCE */}

                <Section title="Experience">

                  {parsedResume ? (

                    <ListData
                      items={
                        parsedResume.experience
                      }
                      type="experience"
                    />

                  ) : (

                    <EmptyText text="Experience details will be extracted from your resume." />

                  )}

                </Section>

                {/* SKILLS */}

                <Section title="Skills detected">

                  {parsedResume ? (

                    <div className="flex flex-wrap gap-1.5">

                      {parsedResume.skills?.length ? (

                        parsedResume.skills.map(
                          (skill, index) => (

                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-700"
                            >
                              {skill}
                            </span>

                          )
                        )

                      ) : (

                        <EmptyText text="No skills detected." />

                      )}

                    </div>

                  ) : (

                    <EmptyText text="Skills will be detected by CareerPath AI." />

                  )}

                </Section>

                {/* CERTIFICATIONS */}

                <Section title="Certifications">

                  {parsedResume ? (

                    <ListData
                      items={
                        parsedResume.certifications
                      }
                      type="certification"
                    />

                  ) : (

                    <EmptyText text="Certifications will be extracted from your resume." />

                  )}

                </Section>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

// --------------------------------
// SECTION
// --------------------------------

function Section({ title, children }) {
  return (
    <div className="p-4 border-b border-gray-100">

      <div className="flex justify-between items-center mb-2.5">

        <p className="text-xs font-semibold text-gray-700">
          {title}
        </p>

        <button className="text-[10px] text-red-500 hover:underline font-medium">
          Edit
        </button>

      </div>

      {children}

    </div>
  );
}

// --------------------------------
// FIELDS
// --------------------------------

function Fields({ items }) {
  return (
    <div className="space-y-1.5">

      {items.map(([key, value]) => (

        <div
          key={key}
          className="flex gap-2"
        >

          <span className="text-[10px] text-gray-400 w-16 flex-shrink-0">
            {key}
          </span>

          <span className="text-[10px] text-gray-700 leading-relaxed break-words">
            {value}
          </span>

        </div>

      ))}

    </div>
  );
}

// --------------------------------
// LIST DATA
// --------------------------------

function ListData({ items, type }) {

  if (!items || items.length === 0) {
    return (
      <EmptyText text="No information detected." />
    );
  }

  return (
    <div className="space-y-3">

      {items.map((rawItem, index) => {

        let item = rawItem;

        // --------------------------------
        // HANDLE JSON STRING
        // --------------------------------

        if (typeof item === "string") {

          try {
            const parsed = JSON.parse(item);

            if (
              parsed &&
              typeof parsed === "object"
            ) {
              item = parsed;
            }
          } catch {
            // Keep normal text as it is
          }
        }

        // --------------------------------
        // NORMAL STRING
        // --------------------------------

        if (typeof item === "string") {

          return (
            <div
              key={index}
              className="text-[10px] text-gray-700 leading-relaxed"
            >
              • {item}
            </div>
          );
        }

        // --------------------------------
        // EDUCATION
        // --------------------------------

        if (type === "education") {

          return (
            <div
              key={index}
              className="border-l-2 border-gray-200 pl-2.5"
            >

              {item.degree && (
                <p className="text-[10px] font-semibold text-gray-800">
                  {item.degree}
                </p>
              )}

              {item.institution && (
                <p className="text-[10px] text-gray-600">
                  {item.institution}
                </p>
              )}

              {item.year && (
                <p className="text-[9px] text-gray-400">
                  {item.year}
                </p>
              )}

              {item.details && (
                <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">
                  {item.details}
                </p>
              )}

            </div>
          );
        }

        // --------------------------------
        // EXPERIENCE
        // --------------------------------

        if (type === "experience") {

          return (
            <div
              key={index}
              className="border-l-2 border-gray-200 pl-2.5"
            >

              {item.jobTitle && (
                <p className="text-[10px] font-semibold text-gray-800">
                  {item.jobTitle}
                </p>
              )}

              {item.company && (
                <p className="text-[10px] text-gray-600">
                  {item.company}
                </p>
              )}

              {item.duration && (
                <p className="text-[9px] text-gray-400">
                  {item.duration}
                </p>
              )}

              {item.description && (
                <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}

            </div>
          );
        }

        // --------------------------------
        // PROJECT
        // --------------------------------

        if (type === "project") {

          return (
            <div
              key={index}
              className="border-l-2 border-gray-200 pl-2.5"
            >

              {item.name && (
                <p className="text-[10px] font-semibold text-gray-800">
                  {item.name}
                </p>
              )}

              {item.description && (
                <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.technologies?.length > 0 && (
                <p className="text-[9px] text-gray-400 mt-1">
                  {item.technologies.join(" · ")}
                </p>
              )}

            </div>
          );
        }

        // --------------------------------
        // CERTIFICATION
        // --------------------------------

        if (type === "certification") {

          return (
            <div
              key={index}
              className="text-[10px] text-gray-700 leading-relaxed"
            >
              •{" "}
              {item.name ||
                item.title ||
                item.certification ||
                "Certification detected"}
            </div>
          );
        }

        return null;
      })}

    </div>
  );
}

// --------------------------------
// EMPTY
// --------------------------------

function EmptyText({ text }) {
  return (
    <p className="text-[10px] text-gray-400 leading-relaxed">
      {text}
    </p>
  );
}