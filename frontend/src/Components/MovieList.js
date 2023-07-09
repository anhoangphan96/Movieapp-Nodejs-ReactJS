import React from "react";
import MovieListItem from "./MovieListItem";
import styles from "./MovieList.module.css";
const MovieList = (props) => {
  //JSX trả ra các list movie, vì trong props. movieDataArr fetch từ trang chủ browse có 1 API search không dùng đến nên slice array từ 0 đến -1
  //Map các phần tử array thành các list phim rồi truyền data xuống MovieListItem
  return (
    <div className={styles.container}>
      {
        <div className={styles.movieList}>
          {props.movieDataArr.map((movieListArr, index) => {
            return (
              <MovieListItem
                key={index + 1}
                movieListArr={movieListArr}
                isLoading={props.isLoading}
              />
            );
          })}
        </div>
      }
    </div>
  );
};
export default MovieList;
