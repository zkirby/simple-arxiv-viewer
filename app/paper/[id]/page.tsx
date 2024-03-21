import * as cheerio from "cheerio";

import {
  ARXIV_ABS_URL_PREFIX,
  ARXIV_HTML_PAGE_CONTENT_SELECTOR,
  ARXIV_HTML_URL_PREFIX,
} from "../../constants";

async function getPaper(id: string) {
  const response = await fetch(`${ARXIV_HTML_URL_PREFIX}${id}`);
  const responseText = await response.text();

  const $ = cheerio.load(responseText);
  const paper = $(ARXIV_HTML_PAGE_CONTENT_SELECTOR);
  paper.find("img").each((_, el) => {
    const $img = $(el);
    const oldSrc = $img.attr("src");
    const newSrc = `${ARXIV_HTML_URL_PREFIX}${id}/${oldSrc}`;
    $img.attr("src", newSrc);
  });
  return paper.html();
}

export default async function Page({ params }: { params: { id: string } }) {
  const entry = await getPaper(params.id);
  console.log(entry);
  return (
    <div>
      <a href={`${ARXIV_ABS_URL_PREFIX}${params.id}`}>click</a>
      <div dangerouslySetInnerHTML={{ __html: entry }} />
    </div>
  );
}
