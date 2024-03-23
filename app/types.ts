export interface PaperSummary {
  id: string;
  pubDate: string; // DateTime
  title?: string;
  author: string; // Just first author
  summary?: string;
}
