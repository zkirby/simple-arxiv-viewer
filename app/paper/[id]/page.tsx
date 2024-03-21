import { ARXIV_HTML_URL_PREFIX } from "@/app/constants";
import Paper from "@/lib/paper";

import "./paper.style.css";

async function getPaper(id: string) {
  const response = await fetch(`${ARXIV_HTML_URL_PREFIX}${id}`);
  const responseText = await response.text();

  const paper = new Paper(id, responseText);

  // run it through AI transformation

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
