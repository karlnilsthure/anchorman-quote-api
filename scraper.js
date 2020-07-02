const axios = require("axios");
const cheerio = require("cheerio");
const { writeFileToJSON } = require("./handleJSON");

const scrapeIMDB = async (cb) => {
  try {
    const html = await getHTML(
      "https://www.imdb.com/title/tt0357413/quotes/?tab=qt&ref_=tt_trv_qu"
    );
    const quotes = findQuotes(html);

    const characters = findCharacters(quotes);

    await writeFileToJSON(
      "quotes.json",
      JSON.stringify({ quotes, characters }),
      "utf8"
    );
  } catch (err) {
    console.log(err);
  }

  cb();
};

const getHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const findQuotes = (html) => {
  const $ = cheerio.load(html);

  let quotes = [];
  $(".sodatext").each((i, el) => {
    let quote = { id: i + 1, characters: [], data: [] };
    $(el)
      .find("p")
      .each((i, p) => {
        if ($(p).find("a").length) {
          const name = $(p).find(".character").text();
          const rawText = $(p).text().trim();
          const formatedText = splitByColon(rawText);

          if (!characterIsAllowed(name)) {
            return false;
          }

          if (!quote.characters.find((character) => character === name)) {
            quote.characters.push(name);
          }

          quote.data.push({ name, text: formatedText });
        }
      });
    if (quote.data.length > 0) {
      quotes.push(quote);
    }
  });

  return quotes;
};

const findCharacters = (quotesArr) => {
  const allCharacters = quotesArr.reduce((charList, quote) => {
    quote.characters.forEach((charName) => {
      const characterNotInList = !charList.find((char) => char === charName);
      if (characterNotInList) {
        charList.push(charName);
      }
    });

    return charList;
  }, []);

  return allCharacters;
};

const splitByColon = (str) => {
  return str.split(":")[1].replace(/\n/g, "");
};

const characterIsAllowed = (name) => {
  return !!allowedNames.find((currentName) => currentName === name);
};

const allowedNames = [
  "Veronica Corningstone",
  "Ron Burgundy",
  "Brian Fantana",
  "Champ Kind",
  "Brick Tamland",
  "Ed Harken",
  "Announcer",
  "News Station Employee",
  "Wes Mantooth",
  "Garth Holliday",
  "Zoo Keeper",
  "Spanish Anchor",
  "Angry Biker",
  "Bill Lawson",
  "Frank Vitchard",
  "Public TV News Anchor",
  "Bartender",
  "Custodian",
  "Tino",
  "Waiter at Tino's",
];

module.exports = { getHTML, findQuotes, scrapeIMDB };
