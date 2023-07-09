import React, { useState } from "react";
import styles from "./ResultList.module.css";
import ResultMovieItem from "./ResultMovieItem";
import MovieDetail from "./MovieDetail";
const ResultList = (props) => {
  //Hiển thị nội dung chung của result List nếu có lỗi và nếu không có movie tìm thấy
  let content = "Please input keyword to search";
  if (props.error) {
    content = props.error;
  }
  //Hiển thị nội dung loading khi đang fetching data search
  if (props.isLoading) {
    content = "Loading...";
  }
  console.log(props.dataSearch);
  //Nếu như kết kết quả tìm kiếm truyền xuống để render là array khác rổng thì display list phim còn không thì hiển thị message không có phim
  const displayResult =
    props.dataSearch.length > 0 ? (
      props.dataSearch.map((movie, i) => (
        <ResultMovieItem key={i + 1} moviedata={movie}></ResultMovieItem>
      ))
    ) : (
      <p className={styles.noMovie}>{content}</p>
    );
  //JSX trả ra tiêu đề kết quả search, và list các phim tìm thấy được
  // nếu như không có data phim nào tìm được thì sẽ hiển thị message yêu cầu nhập keyword đúng
  // Và phần moviedetail khi người dùng nhấn vào phim bất kỳ
  return (
    <div className={`${styles.container} movieCheck`}>
      <h2>Search Result</h2>
      <div
        className={` ${styles.resultList}
          ${!props.dataSearch.length && styles.noList}`}
      >
        {displayResult}
      </div>
      {props.movieModaleOpen && props.curMovieID && (
        <MovieDetail
          movieTrailer={props.movieTrailer}
          error={props.error}
          moviedetail={props.dataSearch.filter((movie) => {
            return movie.id === Number(props.curMovieID);
          })}
        />
      )}
    </div>
  );
};
export default ResultList;
