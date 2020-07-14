const express = require("express");
const path = require("path");

const {
  getAllQuotes,
  getRandomQuote,
  getQuotesByCharacterId,
  getAllCharacters,
} = require("./services");
const { scrapeIMDB } = require("./scraper");

const app = express();

const port = process.env.PORT || 4000;

app.get("/api/quotes", async (req, res) => {
  console.log("gris");
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

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quotes = await getQuotesByCharacterId(id);
    res.send({ quotes });
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
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

scrapeIMDB(() => {
  app.emit("ready");
});

app.on("ready", () => {
  app.listen(port, () =>
    process.stdout.write(`Server is listening to port ${port}`)
  );
});
