const fs = require("fs");
const path = require("path");

function readSQL(file) {
  return fs.readFileSync(
    path.join(__dirname, "../sql", file),
    "utf-8"
  );
}

module.exports = readSQL;