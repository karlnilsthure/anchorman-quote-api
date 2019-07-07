// const dataBase = require('./quotes.json');

const getRandomQuote = (db) => {
  const randomNr = Math.floor(Math.random() * db.length);
  return db[randomNr];
}

const getQuotesByName = (db, name) => {
  return db.filter(obj => obj.name === name)
}

[
  {
    name: 'Garth Holiday',
    quotes: [
      {

      },
    ]
  }
]



// 'Ron Burgundy'
// 'Veronica Corningstone'
// 'Brick Tamland'
// 'Champ Kind'
// 'Brian Fantana'
// 'Garth Holiday'




module.exports.getRandomQuote = getRandomQuote;
module.exports.getQuotesByName = getQuotesByName;