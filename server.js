const fs = require("fs");
const {
  getAllQuotes,
  getRandomQuote,
  getQuotesByName,
  getAllCharacters,
} = require("./services");
const quoteDB = JSON.parse(fs.readFileSync("quotes.json"));
const { scrapeIMDB } = require("./scraper");

const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await getAllQuotes();
    res.send({ quotes });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/quotes/random", async (req, res) => {
  try {
    const quote = await getRandomQuote();
    res.send({ quote });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    const characters = await getAllCharacters();
    res.send({ characters });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/quotes/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const quotes = await getQuotesByName(name);
    res.send({ quotes });
  } catch (err) {
    console.log(err);
  }
});


// app.get("/quotes/search/", async (req, res) => {
//   try {

//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/quotes", sendAllQuotes);
// app.get("/quotes/random", sendRandomQuote);
// app.get("/quotes/search/:name", sendQuotesByName);

// function sendAllQuotes(req, res) {
//   return res.send(quoteDB);
// }

// function sendRandomQuote(req, res) {
//   const data = getRandomQuote(quoteDB);
//   return res.send(data);
// }

// function sendQuotesByName(req, res) {
//   const name = req.params.name;
//   const data = getQuotesByName(quoteDB, name);
//   res.send(data);
// }

const port = 3000;

scrapeIMDB(() => {
  app.emit("ready");
});

app.on("ready", () => {
  app.listen(port, () =>
    process.stdout.write(`Server is listening to port ${port}`)
  );
});
