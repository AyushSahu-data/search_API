// server.js
const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

/*let data = JSON.stringify({
  keyword: "ai",

  limit: "10",
});

let config = {
  method: "post",

  maxBodyLength: Infinity,

  url: "https://api.gyanibooks.com/search_publication/",

  headers: {
    "Content-Type": "application/json",
  },

  data: data,
};

axios
  .request(config)

  .then((response) => {
    console.log("data found");
    console.log(JSON.stringify(response.data));
  })

  .catch((error) => {
    console.log(error);
  });*/

app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/search", async (req, res) => {
  try {
    const { keyword, limit } = req.body;
    // Use your API or search engine here
    const searchResults = await fetchSearchResults(keyword, limit);
    res.json({ results: searchResults }); // Wrap results in an object
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

async function fetchSearchResults(keyword, limit) {
  // Make a request to your chosen API/search engine
  const response = await axios.post(
    "https://api.gyanibooks.com/search_publication/",
    {
      keyword,
      limit,
    }
  );
  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
