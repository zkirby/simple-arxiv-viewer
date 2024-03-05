import React from "react";

interface ArxivPaper {
  title: string;
  summary: string;
  authors: string[];
  link: string;
}

interface PaperListProps {
  papers: ArxivPaper[];
  onPaperSelect: (paper: ArxivPaper) => void;
}

const PaperList: React.FC<PaperListProps> = ({ papers, onPaperSelect }) => {
  return (
    <ul>
      {papers.slice(0, 3).map((paper, index) => (
        <li key={index} onClick={() => onPaperSelect(paper)}>
          {paper.title}
        </li>
      ))}
    </ul>
  );
};

export default PaperList;
