import express from "express";
import cors from "cors";
import Parser from "rss-parser";

const feedparser = new Parser();

const app = express();
app.use(cors()); // Enable CORS for all routes

const paperTypes = [
  { filter: "cs.HC", name: "Human-Computer Interaction" },
  {
    filter: "cs.AI",
    name: "Artificial Intelligence",
  },
  {
    filter: "cs.CY",
    name: "Computers and Society",
  },
  // {
  //   filter: "cs.ET",
  //   name: "Emerging Technologies",
  // },
  {
    filter: "cs.GL",
    name: "General Literature",
  },
  {
    filter: "cs.MM",
    name: "Multimedia",
  },
  {
    filter: "cs.SE",
    name: "Software Engineering",
  },
];

app.post("/api/paper/list", async (req, res) => {
  try {
    const paperMap = new Map();
    for (const paperType of paperTypes) {
      const feed = await feedparser.parseURL(
        "http://export.arxiv.org/api/query?" +
          new URLSearchParams({
            search_query: `cat:${paperType.filter}`,
            max_results: "10",
            sortBy: "lastUpdatedDate",
            sortOrder: "descending",
          })
      );
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      feed.items.forEach((item) => {
        const pubDate = new Date(item.pubDate);
        if (pubDate > threeDaysAgo) {
          if (!paperMap.has(item.id)) {
            item.categories = [paperType.name];
            paperMap.set(item.id, item);
          } else {
            const existingItem = paperMap.get(item.id);
            if (!existingItem.categories.includes(paperType.name)) {
              existingItem.categories.push(paperType.name);
            }
          }
        }
      });
    }

    const items = Array.from(paperMap.values());
    res.send({ items });
  } catch (error) {
    console.error("Error fetching paper:", error);
    res.status(500).send("Error fetching paper");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
