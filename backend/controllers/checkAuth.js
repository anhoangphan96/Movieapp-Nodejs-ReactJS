const CheckAuth = require("../models/CheckAuth");

module.exports = (req, res, next) => {
  const userData = { token: req.query.token, userId: req.query.userId };
  //Nếu kết quả kiểm tra bằng method check của model CheckAuth là true thì gọi next để đến các router cần gọi, không sẽ báo lỗi
  const isAuthoried = CheckAuth.check(userData);
  if (isAuthoried) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
