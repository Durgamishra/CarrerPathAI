import Sidebar from "./Sidebar";

/* =========================================================
   SCORE CARD
========================================================= */

function ScoreCard({
  title,
  score,
  description,
  reason,
}) {
  const numericScore = Number(score) || 0;

  let rating = "Very Poor";

  if (numericScore >= 91) {
    rating = "Excellent";
  } else if (numericScore >= 81) {
    rating = "Very Good";
  } else if (numericScore >= 66) {
    rating = "Good";
  } else if (numericScore >= 51) {
    rating = "Average";
  } else if (numericScore >= 31) {
    rating = "Poor";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-semibold text-gray-700">
            {title}
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>

        {/* Score */}
        <div className="shrink-0 text-right">
          <div className="text-3xl font-bold text-gray-900">
            {numericScore}
            <span className="text-sm font-medium text-gray-400">
              /100
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-gray-500">
            {rating}
          </p>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-black transition-all duration-1000"
          style={{
            width: `${Math.min(
              Math.max(numericScore, 0),
              100
            )}%`,
          }}
        />
      </div>

      {/* Score Percentage */}
      <div className="mt-2 flex justify-between text-[11px] text-gray-400">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>

      {/* AI Explanation */}
      {reason && (
        <div className="mt-5 rounded-xl bg-gray-50 p-4">

          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            AI Assessment
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {reason}
          </p>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   SECTION
========================================================= */

function Section({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}

    </section>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyText() {
  return (
    <p className="text-sm text-gray-400">
      No information detected.
    </p>
  );
}


/* =========================================================
   TEXT LIST
========================================================= */

function TextList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <EmptyText />;
  }

  return (
    <div className="space-y-3">

      {items.map((item, index) => {

        /* Normal string */
        if (typeof item === "string") {
          return (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700"
            >
              <span className="mr-2 font-bold text-gray-900">
                •
              </span>

              {item}
            </div>
          );
        }

        /* Object */
        if (
          typeof item === "object" &&
          item !== null
        ) {
          return (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-4"
            >
              {Object.entries(item).map(
                ([key, value]) => {

                  if (
                    value === null ||
                    value === undefined ||
                    value === ""
                  ) {
                    return null;
                  }

                  return (
                    <div
                      key={key}
                      className="mb-2 last:mb-0"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {key.replace(
                          /([A-Z])/g,
                          " $1"
                        )}
                      </span>

                      <p className="mt-1 text-sm leading-6 text-gray-700">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value)}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          );
        }

        return null;
      })}

    </div>
  );
}


/* =========================================================
   CANDIDATE INFORMATION
========================================================= */

function CandidateInformation({
  candidate,
}) {
  if (!candidate) {
    return <EmptyText />;
  }

  const fields = [
    {
      label: "Name",
      value: candidate.name,
    },
    {
      label: "Email",
      value: candidate.email,
    },
    {
      label: "Phone",
      value: candidate.phone,
    },
    {
      label: "Location",
      value: candidate.location,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">

      {fields.map((field) => (
        <div
          key={field.label}
          className="rounded-xl bg-gray-50 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {field.label}
          </p>

          <p className="mt-2 break-words text-sm font-semibold text-gray-900">
            {field.value || "Not provided"}
          </p>
        </div>
      ))}

      {Array.isArray(candidate.links) &&
        candidate.links.length > 0 && (
          <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Links
            </p>

            <div className="mt-2 space-y-2">

              {candidate.links.map(
                (link, index) => (
                  <p
                    key={index}
                    className="break-all text-sm text-blue-600"
                  >
                    {link}
                  </p>
                )
              )}

            </div>

          </div>
        )}

    </div>
  );
}


/* =========================================================
   EDUCATION
========================================================= */

function EducationList({ education }) {
  if (
    !Array.isArray(education) ||
    education.length === 0
  ) {
    return <EmptyText />;
  }

  return (
    <div className="space-y-4">

      {education.map((item, index) => {

        let educationItem = item;

        /* Handle JSON strings */
        if (typeof item === "string") {
          try {
            educationItem = JSON.parse(item);
          } catch {
            educationItem = {
              details: item,
            };
          }
        }

        return (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >

            <h3 className="font-semibold text-gray-900">
              {educationItem.degree ||
                "Education"}
            </h3>

            {educationItem.institution && (
              <p className="mt-1 text-sm font-medium text-gray-700">
                {educationItem.institution}
              </p>
            )}

            {educationItem.year && (
              <p className="mt-1 text-xs text-gray-400">
                {educationItem.year}
              </p>
            )}

            {educationItem.details && (
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {educationItem.details}
              </p>
            )}

          </div>
        );
      })}

    </div>
  );
}


/* =========================================================
   EXPERIENCE
========================================================= */

function ExperienceList({ experience }) {
  if (
    !Array.isArray(experience) ||
    experience.length === 0
  ) {
    return <EmptyText />;
  }

  return (
    <div className="space-y-4">

      {experience.map((item, index) => {

        let experienceItem = item;

        if (typeof item === "string") {
          try {
            experienceItem = JSON.parse(item);
          } catch {
            experienceItem = {
              description: item,
            };
          }
        }

        return (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >

            <h3 className="font-semibold text-gray-900">
              {experienceItem.jobTitle ||
                "Work Experience"}
            </h3>

            {experienceItem.company && (
              <p className="mt-1 text-sm font-medium text-gray-700">
                {experienceItem.company}
              </p>
            )}

            {experienceItem.duration && (
              <p className="mt-1 text-xs text-gray-400">
                {experienceItem.duration}
              </p>
            )}

            {experienceItem.description && (
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {experienceItem.description}
              </p>
            )}

          </div>
        );
      })}

    </div>
  );
}


/* =========================================================
   PROJECTS
========================================================= */

function ProjectsList({ projects }) {
  if (
    !Array.isArray(projects) ||
    projects.length === 0
  ) {
    return <EmptyText />;
  }

  return (
    <div className="space-y-4">

      {projects.map((item, index) => {

        let project = item;

        if (typeof item === "string") {
          try {
            project = JSON.parse(item);
          } catch {
            project = {
              name: "Project",
              description: item,
            };
          }
        }

        return (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >

            <h3 className="font-semibold text-gray-900">
              {project.name || "Project"}
            </h3>

            {project.description && (
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {project.description}
              </p>
            )}

            {Array.isArray(
              project.technologies
            ) &&
              project.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {project.technologies.map(
                    (technology, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                      >
                        {technology}
                      </span>
                    )
                  )}

                </div>
              )}

          </div>
        );
      })}

    </div>
  );
}


/* =========================================================
   SKILLS
========================================================= */

function SkillsList({ skills }) {
  if (
    !Array.isArray(skills) ||
    skills.length === 0
  ) {
    return <EmptyText />;
  }

  return (
    <div className="flex flex-wrap gap-2">

      {skills.map((skill, index) => (
        <span
          key={index}
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          {typeof skill === "string"
            ? skill
            : JSON.stringify(skill)}
        </span>
      ))}

    </div>
  );
}


/* =========================================================
   CERTIFICATIONS
========================================================= */

function CertificationsList({
  certifications,
}) {
  if (
    !Array.isArray(certifications) ||
    certifications.length === 0
  ) {
    return <EmptyText />;
  }

  return (
    <div className="space-y-3">

      {certifications.map((item, index) => {

        if (typeof item === "string") {
          return (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700"
            >
              • {item}
            </div>
          );
        }

        return (
          <div
            key={index}
            className="rounded-xl bg-gray-50 p-4"
          >

            <p className="font-semibold text-gray-900">
              {item.name ||
                item.title ||
                item.certification ||
                "Certification"}
            </p>

            {item.issuer && (
              <p className="mt-1 text-sm text-gray-500">
                {item.issuer}
              </p>
            )}

            {item.year && (
              <p className="mt-1 text-xs text-gray-400">
                {item.year}
              </p>
            )}

          </div>
        );
      })}

    </div>
  );
}


/* =========================================================
   MAIN ANALYSIS PAGE
========================================================= */

function AnalysisReport({
  onNavigate,
}) {

  /* Get saved AI response */
  const storedAnalysis =
    sessionStorage.getItem(
      "resumeAnalysis"
    );

  const fileName =
    sessionStorage.getItem(
      "resumeFileName"
    );

  let apiData = null;

  try {
    apiData = storedAnalysis
      ? JSON.parse(storedAnalysis)
      : null;
  } catch (error) {
    console.error(
      "Failed to read resume analysis:",
      error
    );
  }

  /*
    Backend returns:

    {
      success: true,
      message: "...",
      analysis: {
        resumeScore: 85,
        atsScore: 90,
        ...
      }
    }

    Therefore we access apiData.analysis.
  */

  const analysis =
    apiData?.analysis || apiData;


  /* =====================================================
     NO ANALYSIS
  ===================================================== */

  if (!analysis) {
    return (
      <div className="flex min-h-screen bg-gray-50">

        <Sidebar
          onNavigate={onNavigate}
        />

        <main className="flex-1 p-8">

          <div className="mx-auto max-w-6xl">

            <h1 className="text-3xl font-bold text-gray-900">
              Resume Analysis
            </h1>

            <p className="mt-3 text-gray-500">
              No resume analysis found.
              Please upload your resume first.
            </p>

            <button
              onClick={() =>
                onNavigate("upload")
              }
              className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Upload Resume
            </button>

          </div>

        </main>

      </div>
    );
  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar
        onNavigate={onNavigate}
      />


      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">

        <div className="mx-auto max-w-6xl">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-medium text-gray-400">
                CareerPath AI
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                Resume Analysis
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                AI-powered analysis of your resume,
                skills and career readiness.
              </p>

              {fileName && (
                <p className="mt-2 text-xs text-gray-400">
                  Analyzed file: {fileName}
                </p>
              )}

            </div>


            <button
              onClick={() =>
                onNavigate("upload")
              }
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Analyze Another Resume
            </button>

          </div>


          {/* =================================================
              CANDIDATE
          ================================================= */}

          <Section
            title="Candidate Information"
            subtitle="Information extracted from your resume."
          >

            <CandidateInformation
              candidate={
                analysis.candidate
              }
            />

          </Section>


          {/* =================================================
              AI SCORES
          ================================================= */}

          <div className="mt-6">

            <div className="mb-4">

              <h2 className="text-xl font-bold text-gray-900">
                AI Resume Evaluation
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Scores generated by AI based on the
                content and structure of your resume.
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              {/* Resume Score */}

              <ScoreCard
                title="Resume Score"
                score={
                  analysis.resumeScore
                }
                description="Overall quality, structure, completeness and professional strength of your resume."
                reason={
                  analysis
                    .scoreExplanation
                    ?.resumeScoreReason
                }
              />


              {/* ATS Score */}

              <ScoreCard
                title="ATS Score"
                score={
                  analysis.atsScore
                }
                description="How well your resume is optimized for Applicant Tracking Systems and keyword matching."
                reason={
                  analysis
                    .scoreExplanation
                    ?.atsScoreReason
                }
              />

            </div>

          </div>


          {/* =================================================
              STRENGTHS + WEAKNESSES
          ================================================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <Section
              title="Resume Strengths"
              subtitle="What your resume is doing well."
            >

              <TextList
                items={
                  analysis.strengths
                }
              />

            </Section>


            <Section
              title="Resume Weaknesses"
              subtitle="Areas that may reduce your resume's effectiveness."
            >

              <TextList
                items={
                  analysis.weaknesses
                }
              />

            </Section>

          </div>


          {/* =================================================
              EDUCATION
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Education"
              subtitle="Academic qualifications detected from your resume."
            >

              <EducationList
                education={
                  analysis.education
                }
              />

            </Section>

          </div>


          {/* =================================================
              EXPERIENCE
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Work Experience"
              subtitle="Professional experience detected from your resume."
            >

              <ExperienceList
                experience={
                  analysis.experience
                }
              />

            </Section>

          </div>


          {/* =================================================
              PROJECTS
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Projects"
              subtitle="Projects and technologies identified by AI."
            >

              <ProjectsList
                projects={
                  analysis.projects
                }
              />

            </Section>

          </div>


          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Skills"
              subtitle="Technical and professional skills detected from your resume."
            >

              <SkillsList
                skills={
                  analysis.skills
                }
              />

            </Section>

          </div>


          {/* =================================================
              CERTIFICATIONS
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Certifications"
              subtitle="Certifications detected from your resume."
            >

              <CertificationsList
                certifications={
                  analysis.certifications
                }
              />

            </Section>

          </div>


          {/* =================================================
              MISSING SKILLS
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Missing Skills"
              subtitle="Skills that could improve your career readiness."
            >

              <TextList
                items={
                  analysis.missingSkills
                }
              />

            </Section>

          </div>


          {/* =================================================
              IMPROVEMENTS
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Recommended Resume Improvements"
              subtitle="AI-generated recommendations for improving your resume."
            >

              <TextList
                items={
                  analysis.improvements
                }
              />

            </Section>

          </div>


          {/* =================================================
              ROADMAP
          ================================================= */}

          <div className="mt-6">

            <Section
              title="Career Roadmap"
              subtitle="Recommended next steps based on your current profile."
            >

              <TextList
                items={
                  analysis.roadmap
                }
              />

            </Section>

          </div>


          {/* =================================================
              NEXT STEP
          ================================================= */}

          <div className="mt-8 rounded-2xl bg-black p-7 text-white">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              CareerPath AI
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Improve your career readiness
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
              Review your missing skills and follow
              the personalized recommendations
              generated from your resume.
            </p>

            <button
              onClick={() =>
                onNavigate("skills")
              }
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
            >
              View Skill Gaps
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AnalysisReport;