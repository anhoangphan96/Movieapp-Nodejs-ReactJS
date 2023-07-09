const fs = require("fs");
const path = require("path");
const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "userToken.json"
);
const CheckAuth = {
  //Method check để tìm xem userid và token mà user gửi đến trong req param có trong database hay không
  //Nếu có sẽ trả về true còn không sẽ là false
  check: function (author) {
    const listUserToken = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    if (
      listUserToken.findIndex(
        (user) => user.userId === author.userId && user.token === author.token
      ) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  },
};

module.exports = CheckAuth;
