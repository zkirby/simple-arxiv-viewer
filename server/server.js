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
];

app.post("/api/paper/list", async (req, res) => {
  try {
    const items = [];
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
      feed.items.forEach((item) => {
        item.category = paperType.name;
      });
      items.push(...feed.items);
    }

    res.send({ items });
  } catch (error) {
    console.error("Error fetching paper:", error);
    res.status(500).send("Error fetching paper");
  }
});

// app.get("/api/paper/:paperLink", async (req, res) => {
//   const { paperLink } = req.params;

//   try {
//     const response = await axios.get(`https://arxiv.org/abs/${paperLink}`);
//     const paperContent = response.data;
//     res.send(paperContent);
//   } catch (error) {
//     console.error("Error fetching paper:", error);
//     res.status(500).send("Error fetching paper");
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
