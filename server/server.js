const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get("/api/paper/:paperLink", async (req, res) => {
  const { paperLink } = req.params;

  try {
    const response = await axios.get(`https://arxiv.org/abs/${paperLink}`);
    const paperContent = response.data;
    res.send(paperContent);
  } catch (error) {
    console.error("Error fetching paper:", error);
    res.status(500).send("Error fetching paper");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
