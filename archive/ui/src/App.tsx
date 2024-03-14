import { useState, useEffect } from "react";
import { fetchArxivPapers } from "./fetchArxivPapers";
import PaperList from "./PapersList";
import PaperViewer from "./PaperViewer";

interface ArxivPaper {
  title: string;
  summary: string;
  authors: string[];
  link: string;
}

function App() {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ArxivPaper | null>(null);

  useEffect(() => {
    fetchArxivPapers().then((data) => setPapers(data));
  }, []);

  const handlePaperSelect = (paper: ArxivPaper) => {
    setSelectedPaper(paper);
  };

  return (
    <div>
      <h1>ArXiv HCI Papers</h1>
      <PaperList papers={papers} onPaperSelect={handlePaperSelect} />
      {selectedPaper && <PaperViewer paper={selectedPaper} />}
    </div>
  );
}

export default App;
