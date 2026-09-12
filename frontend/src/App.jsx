import { useState } from "react";

import Landing from "./components/Landing";
import ResumeUpload from "./components/ResumeUpload";
import AnalysisReport from "./components/AnalysisReport";
import SkillGaps from "./components/SkillGaps";
import Roadmap from "./components/Roadmap";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page === "landing" && (
        <Landing onNavigate={setPage} />
      )}

      {page === "upload" && (
        <ResumeUpload onNavigate={setPage} />
      )}

      {page === "report" && (
        <AnalysisReport onNavigate={setPage} />
      )}

      {page === "skills" && (
        <SkillGaps onNavigate={setPage} />
      )}

      {page === "roadmap" && (
        <Roadmap onNavigate={setPage} />
      )}
    </>
  );
}

export default App;