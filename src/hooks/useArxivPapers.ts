import { useEffect } from "react";
const ARXIV_API_URL = "http://export.arxiv.org/api/query";

export default async function useArxivPapers() {
  useEffect(() => {
    const params = new URLSearchParams({
      search_query: "cat:cs.HC",
      max_results: "100",
      sortBy: "lastUpdatedDate",
      sortOrder: "descending",
    });
    fetch(`${ARXIV_API_URL}?${params}`);

    // console.log(await response.json());
  }, []);

  return [];
}
