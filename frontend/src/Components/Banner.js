import React from "react";
import styles from "./Banner.module.css";
const Banner = (props) => {
  //Đặt các giá trị hiện thỉ ở banner, khi chưa có giá trị fetch sẽ là rổng mặc định khi data load xong thì sẽ thành data hiển thị
  //name, overview, background
  const movieName = props.movieBannerRandom
    ? props.movieBannerRandom.original_name
    : "";
  const movieOverview = props.movieBannerRandom
    ? props.movieBannerRandom.overview
    : "";
  // Background của banner sẽ là màu đen cho đến khi props bannerrandom được truyền xuống sẽ thay bằng backdrop-path
  const backgroundImage = props.movieBannerRandom
    ? `url(https://image.tmdb.org/t/p/original${props.movieBannerRandom.backdrop_path})`
    : "black";
  //banner trả ra các thành phần theo như mẫu, thông tin phim, background, các nút bấm, khi chưa load data xong sẽ hiển thị loading
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImage,
      }}
    >
      <div
        className={`${styles.banner} ${props.isLoading ? styles.loading : ""}`}
      >
        {props.isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.movieIntro}>
            <h2>{movieName}</h2>
            <button>Play</button>
            <button>My List</button>
            <p>{movieOverview}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Banner;
