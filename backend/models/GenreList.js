const fs = require("fs");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);
//Lấy data ở genrelist data
const GenreList = {
  all: function () {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  },
};

module.exports = GenreList;
