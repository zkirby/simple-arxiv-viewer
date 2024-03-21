import express from "express";
import cors from "cors";
import Parser from "rss-parser";
import axios from "axios";
import { xml2js } from "xml-js";

const feedparser = new Parser();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

const paperTypes = [
  // { filter: "cs.HC", name: "Human-Computer Interaction" },
  {
    filter: "cs.AI",
    name: "Artificial Intelligence",
  },
  // {
  //   filter: "cs.CY",
  //   name: "Computers and Society",
  // },
  // {
  //   filter: "cs.ET",
  //   name: "Emerging Technologies",
  // },
  // {
  //   filter: "cs.GL",
  //   name: "General Literature",
  // },
  // {
  //   filter: "cs.MM",
  //   name: "Multimedia",
  // },
  // {
  //   filter: "cs.SE",
  //   name: "Software Engineering",
  // },
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

app.post("/api/paper/find", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Paper ID is required");
  }
  try {
    const response = await axios.get(
      `http://export.arxiv.org/api/query?id_list=${id}`
    );
    const xml = response.data;
    const jsonObj = xml2js(xml, { compact: true, spaces: 4 });
    const entry = jsonObj.feed.entry;

    if (!entry) {
      return res.status(404).send("Paper not found");
    }

    const paper = {
      title: entry.title._text,
      summary: entry.summary._text,
      authors: Array.isArray(entry.author)
        ? entry.author.map((author) => author.name._text)
        : [entry.author.name._text],
      link: entry.id._text,
    };

    res.send(paper);
  } catch (error) {
    console.error("Error fetching paper body:", error);
    res.status(500).send("Error fetching paper body");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
