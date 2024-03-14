// import { useState, useEffect } from "react";
import "./App.css";
import useArxivPapers from "./hooks/useArxivPapers";

function App() {
  // const [papers, setPapers] = useState<ArxivPaper[]>([]);

  useArxivPapers();

  return (
    <div>
      <h1>ArXiv HCI Papers</h1>
      <ul>
        {/* {papers.map((paper) => (
          <li key={paper.link}>
            <h2>{paper.title}</h2>
            <p>{paper.summary}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
