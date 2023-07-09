const Movies = require("../models/Movies");
const GenreList = require("../models/GenreList");
const Trailer = require("../models/Trailer");
const pagingHandler = require("../utils/paging");
//Hai biến chứa danh sách các data lấy từ file data
const listFullMovie = Movies.movieList.all();
const listGenre = GenreList.all();

//Controller kết nối giữa view chứa router trending list với model
exports.getMoviesTrending = (req, res, next) => {
  //Nếu trong api có params page thì lấy page còn không mặc định là 1
  const page = req.query.page ?? 1;
  //Gọi method getTrendigList để xử lý data từ model Movie
  const movieTrendingListPerPage = Movies.movieList.getTrendingList(
    listFullMovie,
    page
  );
  //Nếu như quá trình xử lý paging bị lỗi page request vượt quá totalpage
  if (movieTrendingListPerPage.message) {
    res.status(400).json({ message: movieTrendingListPerPage.message });
  }
  //Trả về status 200 và data của trending list nếu thành công
  res.status(200).send(JSON.stringify(movieTrendingListPerPage));
};

//Controller kết nối giữa view chứa router top-rate list với model
exports.getMoviesTopRate = (req, res, next) => {
  //Nếu trong api có params page thì lấy page còn không mặc định là 1
  const page = req.query.page ?? 1;
  //Gọi method getTopRateList để xử lý data từ model Movie
  const movieTopRateListPerPage = Movies.movieList.getTopRateList(
    listFullMovie,
    page
  );
  //Nếu như quá trình xử lý paging bị lỗi page request vượt quá totalpage
  if (movieTopRateListPerPage.message) {
    res.status(400).json({ message: movieTopRateListPerPage.message });
  }
  //Trả về status 200 và data của top-rate list nếu thành công
  res.status(200).send(JSON.stringify(movieTopRateListPerPage));
};

//Controller kết nối giữa view chứa router  list movie theo thể loại với model
exports.getMoviesByGenre = (req, res, next) => {
  //Nếu trong api có params page thì lấy page còn không mặc định là 1
  const page = req.query.page ?? 1;
  //Lấy thể loại mà request đang yêu cầu
  const genreReq = req.query.genre;
  //Nếu như không tìm thấy genre trong Req param thì trả về lỗi
  if (!genreReq) {
    return res.status(400).json({ message: "Not found gerne parram" });
    //Nếu như thể loại trong param không có trong list Genre của cơ sở dữ liệu sẽ báo lỗi không tìm thấy
  } else if (!listGenre.find((genr) => genr.name === genreReq)) {
    return res.status(400).json({ message: "Not found that gerne id" });
    //Nếu genre không bị lỗi thì sẽ gọi method lấy movielist theo thể loại và truyển các argument cần thiết vào
  } else {
    const movieListByGenrePerPage = Movies.movieList.getMovieByGenre(
      listFullMovie,
      listGenre,
      genreReq,
      page
    );
    //Nếu như quá trình xử lý paging bị lỗi page request vượt quá totalpage
    if (movieListByGenrePerPage.message) {
      res.status(400).json({ message: movieListByGenrePerPage.message });
    }
    //Trả về status 200 và data của list movie theo genre nếu thành công
    res.status(200).send(JSON.stringify(movieListByGenrePerPage));
  }
};

//Controller kết nối giữa view của router lấy video với model
exports.getMovieTrailer = (req, res, next) => {
  //Lấy id của movie và đây là điều kiện bắt buộc nếu không sẽ trả về lỗi
  const movieId = req.body.movieId;
  if (!movieId) {
    res.status(400).json({ message: "Not found film_id parram" });
  } else {
    //Gọi method getTrailer từ model Trailer để lấy trailer, truyền vào movie id và callback function
    Trailer.getTrailer(movieId, (trailer) => {
      //Nếu không tìm được video nào phù hợp tiêu chí sẽ hiện not found video
      if (trailer.length === 0) {
        res.status(400).json({ message: "Not found video" });
      } else {
        //Nếu thành công trả về dữ liệu của trailer tương ứng
        res.status(200).send(JSON.stringify(trailer));
      }
    });
  }
};

exports.getMovieByKeyWord = (req, res, next) => {
  //Nếu trong api có params page thì lấy page còn không mặc định là 1
  const page = req.query.page ?? 1;
  //Lấy các thông số để search
  const keyword = req.body.keyword;
  //Lấy genre Id nếu người dùng có sử dụng genre để filter, nếu không thì là rổng
  const genreId = req.body.genre
    ? listGenre.find((genre) => genre.name === req.body.genre).id
    : "";
  const mediaType = req.body.mediaType;
  const language = req.body.language;
  const year = req.body.year;
  //Nếu có keyword mới thực hiện tiếp không sẽ trả về lỗi không tìm thấy keyword
  if (keyword) {
    //Truyền các thông số cần thiết cho method getMovieByKeywordAndFilter tìm list movies phù hợp
    const movieListSearchPerPage = Movies.movieList.getMovieByKeywordAndFilter(
      listFullMovie,
      keyword,
      page,
      genreId,
      mediaType,
      language,
      year
    );
    //Nếu như kết quả trả về sau khi lọc không có movie nào sẽ trả về lỗi không tìm thấy movie nào
    if (movieListSearchPerPage.results.length === 0) {
      res.status(500).json({ message: "Not Movie Found" });
    }
    //Nếu như quá trình xử lý paging bị lỗi page request vượt quá totalpage
    if (movieListSearchPerPage.message) {
      res.status(400).json({ message: movieListSearchPerPage.message });
    }
    //Còn nếu thành công sẽ trả ra list movie
    res.status(200).send(JSON.stringify(movieListSearchPerPage));
  } else {
    res.status(400).json({ message: "Not found keyword parram" });
  }
};
