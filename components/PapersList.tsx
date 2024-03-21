"use server";
import Parser from "rss-parser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const feedparser = new Parser();

async function getPapers() {
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
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  return feed.items.filter((i) => {
    return new Date(i.pubDate!) > twoDaysAgo;
  });
}
export default async function PapersList() {
  const papers = await getPapers();

  return (
    <>
      {papers.map((p) => {
        return (
          <Card key={p.id} className="mb-5">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>
                <span className="mr-3">
                  {new Date(p.pubDate!).toLocaleDateString()}
                </span>
                <span>By {p.author}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{p.summary}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
