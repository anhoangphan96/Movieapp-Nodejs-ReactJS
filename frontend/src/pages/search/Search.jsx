import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import SearchForm from "../../Components/SearchForm";
import ResultList from "../../Components/ResultList";
import "./Search.css";
const Search = () => {
  //Khai báo các state để quản lý trạng thái, data, error, đóng mở movieDetail, ID movie, trailer ở trang Search,
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieModaleOpen, setMovieModalOpen] = useState(false);
  const [curMovieID, setCurMovieID] = useState(0);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const token = "8qlOkxz4wq";
  const userId = "User 01";
  //Hàm để lấy data search dựa trên keywordSearch được lift state từ trang SearchForm
  //Nếu keyword là rỗng thì trả ra data search là array rỗng, còn nếu lỗi thì sẽ trả ra lỗi cho người dùng
  //Trạng thái Loading hiển thị loading khi bắt đầu search và khi kết thúc search
  const getDataSearchMovie = async (dataSearch) => {
    setIsLoading((prevState) => true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/movies/search?token=${token}&userId=${userId}&page=1`,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataSearch),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      setDataSearch(data.results);
    } catch (error) {
      setDataSearch([]);
      setError(error.message);
    }
    setIsLoading((prevState) => false);
  };
  //Xây dựng function lấy trailer của phim
  const getTrailer = async function (movieId) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/movies/video?token=${token}&userId=${userId}`,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId: movieId }),
        }
      );
      //Trong trường hợp API bị lỗi không tồn tại thì báo với user là phim k có trailer
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      //Kết quả lấy video đã được xử lý logic ở backend
      setMovieTrailer(data[0]);
      setError("");
    } catch (error) {
      setMovieTrailer([]);
      setError(error.message);
    }
  };
  //Xây dựng function khi click vào Movie:  nếu như click vào movie có ID trùng với ID đang mở thì sẽ đóng cửa sổ movieDetail
  // Ngược lại nếu current ID không bằng với ID vừa click thì sẽ mở cửa sổ detail cũng như gọi hàm getTrailer và set ID
  //Có thể mở movieDetail ở multiple thể loại phim, còn nếu
  const chooseMovieHandler = (event) => {
    if (
      event.target.closest(".movieCheck") &&
      event.target.closest(".movieCheck").classList.contains("movieCheck")
    ) {
      if (curMovieID) {
        setMovieModalOpen(true);
      }
      if (event.target.id) {
        setMovieModalOpen(true);
        getTrailer(event.target.id);
        setCurMovieID(event.target.id);
      }
      if (curMovieID === event.target.id) {
        setMovieModalOpen((prevState) => !prevState);
      }
    } else {
      setMovieModalOpen(false);
    }
  };
  //JSX trang search sẽ trả ra data NavBar, SearchFrom và ResultList
  return (
    <div className="app" onClick={chooseMovieHandler}>
      <NavBar />
      <SearchForm getDataSearchMovie={getDataSearchMovie} />
      <ResultList
        dataSearch={dataSearch}
        isLoading={isLoading}
        error={error}
        movieModaleOpen={movieModaleOpen}
        curMovieID={curMovieID}
        movieTrailer={movieTrailer}
      />
    </div>
  );
};

export default Search;
