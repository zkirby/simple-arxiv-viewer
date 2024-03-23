import Parser from "rss-parser";

import PapersList from "@/components/PapersList";
import { ARXIV_ABS_URL_PREFIX } from "@/app/constants";
import { PaperSummary } from "@/app/types";

const feedparser = new Parser();

async function getPapers(): Promise<PaperSummary[]> {
  const feed = await feedparser.parseURL(
    "http://export.arxiv.org/api/query?" +
      new URLSearchParams({
        search_query: `cat:cs.AI`,
        sortBy: "lastUpdatedDate",
        sortOrder: "descending",
        max_results: "10",
      })
  );

  // TODO: Placeholder until a better cutoff date is decided on.
  // The goal for now is to not make the 'Daily Dose' overwhelming.
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 3);

  return feed.items
    .filter((i) => {
      if (!i.pubDate) return false;
      return new Date(i.pubDate) > twoDaysAgo;
    })
    .map((i) => {
      return {
        id: i.id.split(ARXIV_ABS_URL_PREFIX)[1],
        pubDate: i.pubDate!, // undefined are filtered out above
        title: i.title,
        author: i.author,
        summary: i.summary,
      };
    });
}

export default async function Home() {
  const papers = await getPapers();
  const today = new Date();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10 px-36">
      {/* TODO: Add settings */}
      <h1 className="text-xl font-bold mb-2">Your Daily Dose of Arxiv</h1>
      <p className="mb-8 text-slate-500">
        {today.toDateString()} | {papers.length} Papers
      </p>
      <PapersList papers={papers} />
    </main>
  );
}
