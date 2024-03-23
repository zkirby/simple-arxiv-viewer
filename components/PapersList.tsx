"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Link from "next/link";
import { PaperSummary } from "../app/types";

export default async function PapersList({
  papers,
}: {
  papers: PaperSummary[];
}) {
  return (
    <>
      {papers.map((p) => {
        return (
          <Link href={`/paper/${p.id}`}>
            <Card key={p.id} className="mb-5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>
                  <span className="mr-3">
                    {new Date(p.pubDate).toLocaleDateString()}
                  </span>
                  <span>By {p.author}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{p.summary}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
