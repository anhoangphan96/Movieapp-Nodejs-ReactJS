import React from "react";
import styles from "./MovieDetail.module.css";
import YouTube from "react-youtube";
const MovieDetail = (props) => {
  // Thuộc tính opts để sử dụng element Youtube từ react-youtube
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  // Tạo biến imageBackup sẽ được sử dụng trong trường hợp không có trailer or teaser từ youtube
  const imageBackup =
    props.moviedetail[0].backdrop_path ?? props.moviedetail[0].poster_path;
  // JSX của component này sẽ hiển thị các thông tin chi tiết của bộ phim khi ta click vào, name, title, rate, release date, trailer
  //Nếu như props chứa thông tin trailer truyền xuống có length khác 0 sẽ hiển thị video còn k hiển thị hình ảnh
  //Nếu không có hình ảnh backup sẽ hiển thị ảnh mặc định "Poster not found"
  return (
    <div className={styles.movieDetailContainer}>
      <div className={styles.movieDetailContent}>
        <h2>
          {props.moviedetail[0].original_title ??
            props.moviedetail[0].original_name}
        </h2>
        <h4>
          Release Date:{" "}
          {props.moviedetail[0].release_date ??
            props.moviedetail[0].first_air_date}
        </h4>
        <h4>Vote: {props.moviedetail[0].vote_average}/10</h4>
        <p>{props.moviedetail[0].overview}</p>
        {props.error && <h3>{props.error}</h3>}
      </div>
      <div className={styles.movieTrailerFrame}>
        {props.movieTrailer.length !== 0 && props.movieTrailer ? (
          <YouTube videoId={props.movieTrailer.key} opts={opts} />
        ) : (
          <img
            src={
              imageBackup
                ? `https://image.tmdb.org/t/p/original${imageBackup}`
                : "/tải xuống.png"
            }
          />
        )}
      </div>
    </div>
  );
};
export default MovieDetail;
