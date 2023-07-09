const express = require("express");
const movieControllers = require("../controllers/movie");
const router = express.Router();
//Các router dùng chung endpoint đầu là "/api/movies"
//Phần endpoint cuối sẽ tùy thuộc vào tính chất của list movies ví dụng trending, top-rate, theo thể loại, lấy video trailer, search

router.get("/trending", movieControllers.getMoviesTrending);
router.get("/top-rate", movieControllers.getMoviesTopRate);
router.get("/discover", movieControllers.getMoviesByGenre);
//router có endpoint để lấy video trailer
router.post("/video", movieControllers.getMovieTrailer);
//router có endpoint API để search theo từ khóa
router.post("/search", movieControllers.getMovieByKeyWord);
module.exports = router;
