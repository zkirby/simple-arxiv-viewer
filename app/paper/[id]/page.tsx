import { ARXIV_HTML_URL_PREFIX } from "@/app/constants";
import Paper from "@/lib/paper";
import AI from "@/lib/ai";

import "./paper.style.css";

const ai = new AI("gpt-3.5-turbo");

async function getPaper(id: string) {
  const response = await fetch(`${ARXIV_HTML_URL_PREFIX}${id}`);
  const responseText = await response.text();

  const paper = new Paper(id, responseText);
  await paper.transform(ai.simplify.bind(ai));

  return paper;
}

export default async function Page({ params }: { params: { id: string } }) {
  const paper = await getPaper(params.id);

  return (
    <div className="md:mx-72 md:my-5 mx-">
      <div dangerouslySetInnerHTML={{ __html: paper.toString() }} />
    </div>
  );
}
