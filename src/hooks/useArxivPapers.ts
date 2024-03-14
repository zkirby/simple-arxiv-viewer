import { useEffect, useState } from "react";

export default function useArxivPapers() {
  const [papers, setPapers] = useState([]);
  interface Paper {
    pubDate: string;
    [key: string]: any;
  }

  const fetchPapers = async () => {
    const res = await fetch("http://localhost:3000/api/paper/list", {
      method: "POST",
    });
    const data = await res.json();
    setPapers(
      data.items.sort(
        (a: Paper, b: Paper) =>
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
    );
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return papers as any[];
}
