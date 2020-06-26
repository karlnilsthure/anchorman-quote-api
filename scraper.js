const axios = require("axios");
const cheerio = require("cheerio");

const scrapeIMDB = async (cb) => {
  const html = await getHTML(
    "https://www.imdb.com/title/tt0357413/quotes/?tab=qt&ref_=tt_trv_qu"
  );
  const quotes = findQuotes(html);
  cb()
};

const getHTML = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const findQuotes = (html) => {
  const $ = cheerio.load(html);

  let quotes = [];
  $(".sodatext").each((i, el) => {
    let quote = { id: i + 1, data: [] };
    $(el)
      .find("p")
      .each((i, p) => {
        if ($(p).find("a").length) {
          const name = $(p).find(".character").text();
          const rawText = $(p).text().trim();
          const formatedText = splitByColon(rawText);

          quote.data.push({ name, text: formatedText });
        }
      });
    quotes.push(quote);
  });

  return quotes;
};

const splitByColon = (str) => {
  return str.split(":")[1];
};

module.exports = { getHTML, findQuotes, scrapeIMDB };
