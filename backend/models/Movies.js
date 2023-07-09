const fs = require("fs");
const path = require("path");
const pagingHandler = require("../utils/paging");
//Tạo đường dẫn cho file movielist để fetch data từ file ra
const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

const Movies = {
  //method này để lấy full list movie data trong phần data
  all: function () {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  },

  //Method lấy trending list lấy listfull movie sắp xếp theo độ nổi tiếng, sau đó dùng cơ chế paging để trả kết quả
  getTrendingList: function (listFullMovie, page) {
    const movieTrendingList = listFullMovie.sort(
      (a, b) => b.popularity - a.popularity
    );
    return pagingHandler(movieTrendingList, page);
  },

  //Method lấy top-rate list lấy listfull movie sắp xếp theo rating, sau đó dùng cơ chế paging để trả kết quả
  getTopRateList: function (listFullMovie, page) {
    const movieTopRateList = listFullMovie.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return pagingHandler(movieTopRateList, page);
  },

  //Method để lấy các list movie theo thể loại, sau đó dùng cơ chế paging để trả kết quả
  getMovieByGenre: function (listFullMovie, listGenre, genreReq, page) {
    //Tìm ra thể loại do req đang gửi tới
    const genreCur = listGenre.find((genr) => genr.name === genreReq);
    //Lọc ra phim có chứa thể loại đang được yêu cầu
    const movieListByGenre = listFullMovie.filter((movie) =>
      movie.genre_ids.includes(genreCur.id)
    );
    return {
      ...pagingHandler(movieListByGenre, page),
      genre_name: genreCur.name,
    };
  },

  //Method để lấy list movies theo keyword search và các điều kiện filter
  getMovieByKeywordAndFilter: function (
    listFullMovie,
    keyword,
    page,
    genreId,
    mediaType,
    language,
    year
  ) {
    //Lọc ra list movie theo điều kiện, bắt buộc là phải lọc theo keyword (một số trường hợp dùng title 1 số dùng name)
    //Các tiêu chí phụ nếu có data thì lọc theo data còn không thì sẽ trả về true xem như bỏ qua điều kiện đó
    const movieListSearch = listFullMovie.filter((movie) => {
      return (
        ((movie.title
          ? movie.title.toLowerCase().includes(keyword.toLowerCase())
          : movie.name.toLowerCase().includes(keyword.toLowerCase())) ||
          movie.overview.toLowerCase().includes(keyword.toLowerCase())) &&
        (genreId ? movie.genre_ids.includes(genreId) : true) &&
        (mediaType && mediaType !== "all"
          ? movie.media_type === mediaType
          : true) &&
        (language ? movie.original_language === language : true) &&
        (year
          ? (movie.release_date ?? movie.first_air_date).slice(0, 4) === year
          : true)
      );
    });
    //Xử lý trả kết quả bằng cơ chế paging
    return pagingHandler(movieListSearch, page);
  },
};

exports.movieList = Movies;
