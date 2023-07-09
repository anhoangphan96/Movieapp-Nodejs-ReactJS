import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Banner from "../../Components/Banner.js";
import MovieList from "../../Components/MovieList";
function Browse() {
  //Các state để quản lý data movie Array, banner random và trạng thái loading
  const [movieDataArr, setmovieDataArr] = useState([]);
  const [movieBannerRandom, setMovieBannerRandom] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //API key
  const API_KEY = "381d90cbe832f9ed337e1407f33d8116";
  const token = "8qlOkxz4wq";
  const userId = "User 01";
  //quản lý các api bằng object
  const requests = {
    //Với những link http request không có param page thì khi fetch mặc định thông số page là 1
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTrending: `http://localhost:8000/api/movies/trending?token=${token}&userId=${userId}&page=1`,
    fetchTopRated: `http://localhost:8000/api/movies/top-rate?token=${token}&userId=${userId}&page=2`,
    fetchActionMovies: `http://localhost:8000/api/movies/discover?token=${token}&userId=${userId}&genre=Action&page=3`,
    fetchComedyMovies: `http://localhost:8000/api/movies/discover?token=${token}&userId=${userId}&genre=Comedy&page=4`,
    fetchHorrorMovies: `http://localhost:8000/api/movies/discover?token=${token}&userId=${userId}&genre=Horror`,
    fetchRomanceMovies: `http://localhost:8000/api/movies/discover?token=${token}&userId=${userId}&genre=Romance`,
    fetchDocumentaries: `http://localhost:8000/api/movies/discover?token=${token}&userId=${userId}&genre=Documentary`,
  };
  //Khai báo array rổng để sau khi fetching sẽ push các data của từng thể loại phim vào
  const movieArrTem = [];
  //Hàm để fetching data các thể loại phim bằng vòng lặp for trong object
  //Bắt đầu fetching thì trạng thái loading và true và kết thúc sẽ là false để hiển thị Loading... cho người dùng
  const getMovieFunction = async function () {
    setIsLoading(true);
    for (const request in requests) {
      //Do là phải fetching từ cả backend và themoviesdb nên sẽ có toán tử 3 ngôi để nhận biết fetch từ đâu, cấu trúc response sau fetch là khá giống nhau
      try {
        const response = await fetch(
          requests[request].slice(0, 4) === "http"
            ? `${requests[request]}`
            : `https://api.themoviedb.org/3${requests[request]}`
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message);
        }
        const data = await response.json();
        movieArrTem.push({ type: request, data: data });
      } catch (error) {
        movieArrTem.push({ type: request, error: error.message });
      }
    }
    setmovieDataArr(movieArrTem);
    setIsLoading(false);
  };
  //Sử dụng useEffect cho hàm gọi data movie khi load vào trang web
  useEffect(() => {
    getMovieFunction();
  }, []);
  //Lọc ra mảng chứa data sử dụng cho phần banner và  Lấy random 1 movie cho banner
  useEffect(() => {
    const movieArrforBanner = movieDataArr.filter(
      (dataarr) => dataarr.type === "fetchNetflixOriginals"
    );
    if (movieArrforBanner.length !== 0) {
      setMovieBannerRandom(
        movieArrforBanner[0].data.results[
          Math.floor(
            Math.random() * movieArrforBanner[0].data.results.length - 1
          )
        ]
      );
    }
  }, [movieDataArr]);
  //Thành phần JSX trang chủ gồm có Navbar, banner và Movielist chứa các list thể loại phim
  return (
    <div className="app">
      <NavBar />
      <Banner movieBannerRandom={movieBannerRandom} isLoading={isLoading} />
      <MovieList movieDataArr={movieDataArr} isLoading={isLoading} />
    </div>
  );
}

export default Browse;
