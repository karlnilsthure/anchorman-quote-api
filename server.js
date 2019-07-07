// console.log('starting server');
const fs = require('fs');
const { getRandomQuote, getQuotesByName } = require('./services');
const quoteDB = JSON.parse(fs.readFileSync('quotes.json'));

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/quotes', sendAllQuotes);
app.get('/quotes/random', sendRandomQuote);
app.get('/quotes/search/:name', sendQuotesByName);

function sendAllQuotes (req, res) {
  return res.send(quoteDB);
}

function sendRandomQuote (req, res) {
  const data = getRandomQuote(quoteDB)
  return res.send(data);
}

function sendQuotesByName (req, res) {
  const name = req.params.name
  const data =  getQuotesByName(quoteDB, name);
  res.send(data);
}

const port = 3000;

app.listen(port, () => process.stdout.write(`Server is listening to port ${port}`));