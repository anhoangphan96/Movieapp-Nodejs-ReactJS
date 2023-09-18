import React, { useState } from "react";
import MovieItem from "./MovieItem";
import styles from "./MovieListItem.module.css";
import MovieDetail from "./MovieDetail";
const MovieListItem = (props) => {
  //Đắt các state để quản l1y việc hiển thị moviedetail, ID của phim khi được click vào, trailer và error
  const [movieModaleOpen, setMovieModalOpen] = useState(false);
  const [curMovieID, setCurMovieID] = useState(0);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [error, setError] = useState("");
  const token = "8qlOkxz4wq";
  const userId = "User 01";
  //Đặt tên các thể loại phim theo type lưu từ props movieListArr để hiển thị đề mục từng dòng phim
  let titleList;
  if (props.movieListArr.type === "fetchNetflixOriginals") {
    titleList = "";
  } else if (props.movieListArr.type === "fetchTrending") {
    titleList = "Xu Hướng";
  } else if (props.movieListArr.type === "fetchTopRated") {
    titleList = "Xếp hạng cao";
  } else if (props.movieListArr.type === "fetchActionMovies") {
    titleList = "Hành Động";
  } else if (props.movieListArr.type === "fetchComedyMovies") {
    titleList = "Hài";
  } else if (props.movieListArr.type === "fetchHorrorMovies") {
    titleList = "Kinh Dị";
  } else if (props.movieListArr.type === "fetchRomanceMovies") {
    titleList = "Lãng mạng";
  } else if (props.movieListArr.type === "fetchDocumentaries") {
    titleList = "Tài liệu";
  }
  //Xây dựng function lấy trailer của phim

  const getTrailer = async function (movieId) {
    try {
      //Nếu titleList là "" thì đó là type originalNetflix fetch từ themoviesdb còn lại sẽ lấy từ backend
      const response =
        titleList === ""
          ? await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=381d90cbe832f9ed337e1407f33d8116`
            )
          : await fetch(
              `${process.env.BACKEND_URL}/api/movies/video?token=${token}&userId=${userId}`,
              {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieId: movieId }),
              }
            );
      console.log(response);
      //Trong trường hợp API bị lỗi không tồn tại thì báo với user là phim k có trailer
      //----Đoạn code dưới đây là logic xử lý cho cả trailer lấy từ backend
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        //Một là trả ra message lỗi từ backend, hai nếu lấy video từ themoviesdb bị lỗi sẽ hiển thị Not found Video
        throw new Error(errorMessage.message ?? "Not found Video");
      }
      const data = await response.json();

      //Đối với những trailer được lấy từ backend đã được xử lý logic để lấy ra Trailer mới nhất nên trả về mảng chứ 1 phần tử
      //Những trailer lấy từ themoviesdb sẽ phải được xủ lý logic lại bằng khối else, data.length === 0 đã được xử lý ở backend
      if (titleList !== "") {
        setMovieTrailer(data[0]);
        setError("");

        //---------Đoạn code này xử lý cho trailer fetch từ themoviesdb cho phần nextflixOriginal
      } else {
        // Lọc ra lấy data trailer theo thứ tự ưu tiên lấy trailer nếu không có mới lấy teaser với site Youtube, nếu không có trả mảng rỗng
        let trailerdata = data.results.filter((arr) => {
          return arr.site === "YouTube" && arr.type === "Trailer";
        });
        if (trailerdata.length === 0) {
          trailerdata = data.results.filter((arr) => {
            return arr.site === "YouTube" && arr.type === "Teaser";
          });
        }
        //Nếu trailerdata có giá trị thì lấy giá trị đó để truyền xuống cho movie detail, và set Error thành string rỗng
        //Nếu trailer data không có thì setMovieTrailer thành mảng rỗng  và báo user là không có trailer(Nguồn Youtube không có)
        if (trailerdata[0]) {
          setMovieTrailer(trailerdata[0]);
          setError("");
        } else {
          setError("Not found Video");
          setMovieTrailer([]);
        }
      }
    } catch (error) {
      console.log(error);
      setMovieTrailer([]);
      setError(error.message);
    }
  };

  //Xây dựng function khi click vào Movie:  nếu như click vào movie có ID trùng với ID đang mở thì sẽ đóng cửa sổ movieDetail
  // Ngược lại nếu current ID không bằng với ID vừa click thì sẽ mở cửa sổ detail cũng như gọi hàm getTrailer và set ID
  //Có thể mở movieDetail ở multiple thể loại phim, còn nếu
  const chooseMovieHandler = (event) => {
    if (curMovieID === event.target.id) {
      setMovieModalOpen((prevState) => !prevState);
    } else {
      setMovieModalOpen(true);
    }
    setCurMovieID(event.target.id);
    getTrailer(event.target.id);
  };

  //JSX trả ra tên thể loại phim, thẻ div chứa tất cả các phim trong thể loại nằm ngang và dùng scrollbar để hiển thị tất cả
  // phần moviedetail hiển thị theo logic giải thích ở trên
  return (
    <div className={styles.container}>
      <h2>{titleList}</h2>
      <div className={styles.listMovieItem} onClick={chooseMovieHandler}>
        {!props.movieListArr.error &&
          props.movieListArr.data.results.map((movie) => (
            <MovieItem
              key={movie.id}
              type={props.movieListArr.type}
              moviesingle={movie}
            />
          ))}
      </div>
      {props.movieListArr.error && (
        <h2 className={styles.errorFetch}>{props.movieListArr.error}</h2>
      )}
      {movieModaleOpen && curMovieID && (
        <MovieDetail
          movieTrailer={movieTrailer}
          error={error}
          moviedetail={props.movieListArr.data.results.filter((movie) => {
            return movie.id === Number(curMovieID);
          })}
        />
      )}
    </div>
  );
};
export default MovieListItem;
