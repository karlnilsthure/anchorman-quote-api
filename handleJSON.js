const fs = require("fs");
const { promisify } = require("util");

const writeFileToJSON = promisify(fs.writeFile);

const readJSONfilePromise = promisify(fs.readFile);

const readJSONfile = async (str) => {
  const data = await readJSONfilePromise(str, "utf8");
  return JSON.parse(data);
};

module.exports = { writeFileToJSON, readJSONfile };
