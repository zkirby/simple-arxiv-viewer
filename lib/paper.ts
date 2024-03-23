import type { Cheerio, Element, CheerioAPI } from "cheerio";
import * as cheerio from "cheerio";

import { ARXIV_HTML_URL_PREFIX } from "@/app/constants";

const ARXIV_HTML_PAGE_CONTENT_SELECTOR = ".ltx_page_content";
const ARXIV_HTML_BIBLIO_SELECTOR = ".ltx_bibliography";

type HtmlString = string;

// Utility for working with the HTML Paper feed
export default class Paper {
  private $: CheerioAPI;
  private _paper: Cheerio<Element>;
  private _biblio: Cheerio<Element>;

  constructor(readonly id: string, readonly paperHtmlString: HtmlString) {
    this.$ = cheerio.load(paperHtmlString);
    this._paper = this.$(ARXIV_HTML_PAGE_CONTENT_SELECTOR);
    this._biblio = this.$(ARXIV_HTML_BIBLIO_SELECTOR);

    this.changeImageRelativeImports();
    this.addCitationTooltips();
  }

  toString() {
    return this._paper.html() ?? "";
  }

  async transform(cb: (paperString: HtmlString) => Promise<HtmlString>) {
    this._paper.html(await cb(this.toString()));
  }

  /**
   * Arxiv HTML pages have relative image imports, change
   * them to absolute imports.
   */
  private changeImageRelativeImports() {
    this._paper.find("img").each((_, el) => {
      const $img = this.$(el);
      const oldSrc = $img.attr("src");
      const newSrc = `${ARXIV_HTML_URL_PREFIX}${this.id}/${oldSrc}`;
      $img.attr("src", newSrc);
    });
  }

  /**
   * Condense the meta data about the author into a popover
   *
   * TODO: implement
   */
  private condenseAuthorMeta() {}

  /**
   * Turn the citations into tooltips
   *
   * TODO: implement
   */
  private addCitationTooltips() {
    this._paper.find("cite").each((_, el) => {
      const $cite = this.$(el);
      const $link = this.$($cite).find("a");

      const bibId = $link.attr("href")?.split("#")[1];
      if (!bibId) {
        console.error("No bibId found for citation", $cite.html());
        return;
      }
      const bibEl = this.$(`#${bibId.replace(".", "\\.")}`);

      $cite.html(
        `<span class="ltx_citation_text">${$cite.text()}<span class="ltx_tooltip">${bibEl.text()}</span></span>`
      );
    });
  }

  /**
   * Hide the bibliography section of the paper. We'll make this
   * a setting in the future.
   *
   * TODO: implement
   */
  private removeBibliography() {}
}
