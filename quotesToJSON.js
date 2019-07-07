const fs = require('fs');

let rawQuotes = fs.readFileSync('anchorman-quotes.txt', 'utf8');

const createQuotesArr = (str) => {
  return str.replace(/^ *\n/gm, '')
    .split('\n')
    .map(el => el.split(':'))
    .map(arr => {
      return { 'name': arr[0], 'quote': arr[1] }
    });
}

const writeQuotesToFile = (arr) => {
  fs.writeFileSync('quotes.json', arr, 'utf8');
}

const quotesToFile = createQuotesArr(rawQuotes);

writeQuotesToFile(JSON.stringify(quotesToFile));