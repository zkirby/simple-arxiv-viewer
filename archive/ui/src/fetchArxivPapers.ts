import axios from "axios";
import { xml2js } from "xml-js";

const ARXIV_API_URL = "http://export.arxiv.org/api/query";
const SERVER_URL = "http://localhost:3000/api/paper"; // Update with your server URL

interface ArxivPaper {
  title: string;
  summary: string;
  authors: string[];
  link: string;
  content: string;
}

export async function fetchArxivPapers(): Promise<ArxivPaper[]> {
  const response = await axios.get(ARXIV_API_URL, {
    params: {
      search_query: "cat:cs.HC",
      max_results: 100,
      sortBy: "lastUpdatedDate",
      sortOrder: "descending",
    },
  });

  const xml = response.data;
  const jsonObj = xml2js(xml, { compact: true, spaces: 4 });
  const entries = jsonObj.feed.entry;

  const papers: ArxivPaper[] = await Promise.all(
    entries.map(async (entry: any) => {
      const authors = Array.isArray(entry.author)
        ? entry.author.map((author: any) => author._text)
        : [entry.author._text];

      const summary = entry.summary._text.slice(0, 400) + "...";
      const link = entry.id._text;

      const paperLink = link.replace("http://arxiv.org/abs/", "");
      const paperResponse = await axios.get(`${SERVER_URL}/${paperLink}`);
      const paperContent = paperResponse.data;

      return {
        title: entry.title._text,
        summary,
        authors,
        link,
        content: paperContent,
      };
    })
  );

  return papers;
}
