const { readJSONfile } = require("./handleJSON");

const getAllQuotes = async () => {
  try {
    const { quotes } = await readJSONfile("quotes.json");

    return quotes;
  } catch (err) {
    console.log(err);
  }
};

const getRandomQuote = async () => {
  try {
    const { quotes } = await readJSONfile("quotes.json");
    const randomNr = Math.floor(Math.random() * quotes.length);

    return quotes[randomNr];
  } catch (err) {
    console.log(err);
  }
};

const getQuotesByCharacterId = async (id) => {
  try {
    const { quotes, characters } = await readJSONfile("quotes.json");
    const { name } = characters.find((el) => el.id === parseInt(id));

    const quotesByCharacter = quotes.filter((quote) => {
      return quote.characters.find((character) => character === name);
    });

    return quotesByCharacter;
  } catch (err) {
    console.log(err);
  }
};

const getAllCharacters = async () => {
  try {
    const { quotes } = await readJSONfile("quotes.json");

    const allCharacters = quotes.reduce((charList, quote) => {
      quote.characters.forEach((charName) => {
        const characterNotInList = !charList.find((char) => char === charName);
        if (characterNotInList) {
          charList.push(charName);
        }
      });

      return charList;
    }, []);

    return allCharacters;
  } catch (err) {
    console.log(err);
  }
};

[
  {
    name: "Garth Holiday",
    quotes: [{}],
  },
];

// 'Ron Burgundy'
// 'Veronica Corningstone'
// 'Brick Tamland'
// 'Champ Kind'
// 'Brian Fantana'
// 'Garth Holiday'

module.exports = {
  getAllQuotes,
  getRandomQuote,
  getQuotesByCharacterId,
  getAllCharacters,
};
