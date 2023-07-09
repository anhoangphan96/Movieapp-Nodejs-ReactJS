//Import các package, router cần sử dụng
const express = require("express");
const moviesList = require("./routes/movie");
const bodyParser = require("body-parser");
const cors = require("cors");
const checkAuth = require("./routes/checkAuth");
const error404 = require("./controllers/404error");
const app = express();
app.use(cors());
app.use(bodyParser.json());
// khi gọi đến route bất kỳ thì cần phải check authorization trước nếu lỗi sẽ trả ra lỗi theo trong checkAuth, thành công sẽ gọi next()
app.use(checkAuth);

// Các endpoint liên quan đến movies list dùng chung "/api/movies"
app.use("/api/movies", moviesList);

//Nếu gọi đến route không tồn tại sẽ trả về page lỗi
app.use(error404.routeNotFound);
app.listen(8000);
