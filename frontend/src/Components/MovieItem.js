import React from "react";
import styles from "./MovieItem.module.css";
const MovieItem = (props) => {
  const movieType = props.type;

  //JSX trả ra giá trị hình ảnh cho từng phim, nếu thuộc tính type của phim là netflix thì sẽ hiển thị poster, còn các thể loại
  //phim khác sẽ hiển thị backdrop, trong trường hợp k có backdrop sẽ lấy poster để hiển thị, nếu k có cả 2 sẽ hiển thị "ảnh poster not found"
  return (
    <div>
      <img
        id={props.moviesingle.id}
        className={movieType === "fetchNetflixOriginals" ? styles.netflix : ""}
        src={
          props.moviesingle.poster_path || props.moviesingle.backdrop_path
            ? `https://image.tmdb.org/t/p/original${
                props.type === "fetchNetflixOriginals"
                  ? props.moviesingle.poster_path
                  : props.moviesingle.backdrop_path ??
                    props.moviesingle.poster_path
              }`
            : "tải xuống.png"
        }
        alt="No picture found"
      />
    </div>
  );
};
export default MovieItem;
