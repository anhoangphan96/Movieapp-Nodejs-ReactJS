import React from "react";
import styles from "./ResultMovieItem.module.css";
const ResultMovieItem = (props) => {
  //JSX trả ra ảnh từng bộ phim tìm thấy được, thứ tự sử dụng: poster (nếu có) > backdrop (nếu có)
  //Nếu phim đã quá cũ sẽ không có bất kỳ hình ảnh nào sẽ hiển thị ảnh poster not found
  return (
    <img
      className={styles.movieItem}
      id={props.moviedata.id}
      src={
        props.moviedata.poster_path || props.moviedata.backdrop_path
          ? `https://image.tmdb.org/t/p/original${
              props.moviedata.poster_path ?? props.moviedata.backdrop_path
            }`
          : "/tải xuống.png"
      }
      alt="No Any picture Found for this movie"
    />
  );
};
export default ResultMovieItem;
