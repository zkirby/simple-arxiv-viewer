import React, { useState, useEffect } from "react";

interface ArxivPaper {
  title: string;
  summary: string;
  authors: string[];
  link: string;
  content: string;
}

interface PaperViewerProps {
  paper: ArxivPaper;
}

const PaperViewer: React.FC<PaperViewerProps> = ({ paper }) => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-2">{paper.title}</h2>
      <p className="mb-2 text-dark-gray">Authors: {paper.authors.join(", ")}</p>
      <p className="mb-4 text-gray-600">{paper.summary}</p>
      {/* <XMLParser
        xml={paper.content}
        className="mb-4"
        renderInnerHTML={(node) => <div>{node.value}</div>}
      /> */}
      <a
        href={paper.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mint-green hover:underline"
      >
        View on arXiv
      </a>
    </div>
  );
};

export default PaperViewer;
