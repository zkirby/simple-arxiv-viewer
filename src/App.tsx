import { useState, useEffect, useMemo } from "react";
import useArxivPapers from "./hooks/useArxivPapers";

const categoryColors: { [key: string]: string } = {
  "Human-Computer Interaction": "bg-pastel-green-200",
  "Artificial Intelligence": "bg-pastel-blue-200",
  "Computers and Society": "bg-pastel-pink-200",
  "General Literature": "bg-pastel-orange-200",
  Multimedia: "bg-pastel-purple-200",
  "Software Engineering": "bg-pastel-red-200",
  All: "bg-pastel-yellow-200",
};

function App() {
  const allPapers = useArxivPapers();
  const [filter, setFilter] = useState("All");
  // Initialize viewedPapers from local storage or as an empty array
  const [viewedPapers, setViewedPapers] = useState(() => {
    const saved = localStorage.getItem("viewedPapers");
    return saved ? JSON.parse(saved) : [];
  });

  const categories = useMemo(
    () => Array.from(new Set(allPapers.flatMap((paper) => paper.categories))),
    [allPapers]
  );

  // Update local storage when viewedPapers changes
  useEffect(() => {
    localStorage.setItem("viewedPapers", JSON.stringify(viewedPapers));
  }, [viewedPapers]);

  const handleCheckOff = (id: string) => {
    if (!viewedPapers.includes(id)) {
      setViewedPapers([...viewedPapers, id]);
    }
  };

  const filteredPapers = useMemo(() => {
    const filtered =
      filter === "All"
        ? allPapers.filter((paper) => !viewedPapers.includes(paper.id))
        : allPapers.filter(
            (paper) =>
              paper.categories.includes(filter) &&
              !viewedPapers.includes(paper.id)
          );

    console.log(filtered.length, allPapers.length, viewedPapers.length);
    return filtered;
  }, [filter, allPapers, viewedPapers]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ArXiv Papers</h1>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <select
            className="p-2 rounded border-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="text-gray-700">
            {filteredPapers.length} Papers Showing
          </span>
        </div>
      </div>
      <div className="space-y-8">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white shadow-lg rounded-lg p-6 relative"
          >
            <div className="absolute top-4 right-4">
              <label
                htmlFor={`viewed-${paper.id}`}
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    id={`viewed-${paper.id}`}
                    type="checkbox"
                    className="sr-only"
                    onChange={() => handleCheckOff(paper.id)}
                    checked={viewedPapers.includes(paper.id)}
                  />
                  <div className="bg-gray-300 w-6 h-6"></div>
                </div>
                <div className="ml-2 text-gray-700 font-medium">Viewed</div>
              </label>
            </div>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {paper.title}
              </h2>
            </a>
            <p className="text-gray-700 mt-2">{paper.summary}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-600">By {paper.author}</span>
              <span className="text-sm text-gray-600 float-right">
                {new Date(paper.pubDate).toLocaleDateString()}
              </span>
              {paper.categories.map((category) => (
                <div
                  key={category}
                  className={`text-sm font-medium rounded-full text-gray-800 px-3 py-1 ml-2 inline-block ${
                    categoryColors[category] || categoryColors["All"]
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
