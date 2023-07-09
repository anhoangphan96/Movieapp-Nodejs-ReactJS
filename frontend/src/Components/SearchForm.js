import React, { useState } from "react";
import styles from "./SearchForm.module.css";
const SearchForm = (props) => {
  //Khai báo state quản lý giá trị input
  const [inputSearch, setInputSearch] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputMediaType, setInputMediaType] = useState("");
  const [inputLanguage, setInputLanguage] = useState("");
  const [inputYear, setInputYear] = useState("");
  //Các hàm để quản lý việc thay đổi giá trị input của người dùng
  const inputMovieChangeHandler = (event) => {
    setInputSearch(event.target.value);
  };
  const changeGenreHandler = (event) => {
    setInputGenre(event.target.value);
  };
  const changeMediaTypeHandler = (event) => {
    setInputMediaType(event.target.value);
  };
  const changeLanguageHandler = (event) => {
    setInputLanguage(event.target.value);
  };
  const changeYearHandler = (event) => {
    setInputYear(event.target.value);
  };
  //Hàm để lift up state input keyword search của người dùng lên cho trang search chính Search,js khi người dùng nhấn search
  const searchMovieHandler = () => {
    props.getDataSearchMovie({
      keyword: inputSearch,
      genre: inputGenre,
      mediaType: inputMediaType,
      language: inputLanguage,
      year: inputYear,
    });
  };
  //Hàm reset data: lift up string rỗng lên cho hàm getDataSearch ở trang chủ và xóa input người dùng
  const resetHandler = (event) => {
    props.getDataSearchMovie({
      keyword: "",
      genre: "",
      mediaType: "",
      language: "",
      year: "",
    });
    setInputSearch("");
    setInputGenre("");
    setInputMediaType("");
    setInputLanguage("");
    setInputYear("");
  };
  //2 biến hổ trợ render option năm và genre để lựa chọn
  let yearOptions = [];
  for (let i = 2023; i >= 1900; i--) {
    yearOptions.push(i);
  }
  const genreOptions = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  //JSX trả ra các element html của form search gồm input người dùng, icon search, nút search và nút reset
  return (
    <div className={styles.container}>
      <div className={styles.searchForm}>
        <form className={styles.searchframe}>
          <input
            value={inputSearch}
            placeholder="Input keyword to search your movie"
            onChange={inputMovieChangeHandler}
          ></input>
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
          <h3 className={styles.filterHeader}>Filter Conditions</h3>
          <select
            type="text"
            name="genre"
            onChange={changeGenreHandler}
            value={inputGenre}
          >
            <option value="" selected>
              Select Genre
            </option>
            {genreOptions.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
          <select
            type="text"
            name="mediaType"
            onChange={changeMediaTypeHandler}
            value={inputMediaType}
          >
            <option value="" selected>
              Select Media Type
            </option>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">Tv</option>
            <option value="person">Person</option>
          </select>
          <select
            type="text"
            name="language"
            onChange={changeLanguageHandler}
            value={inputLanguage}
          >
            <option value="" selected>
              Select Language
            </option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
          <select
            type="number"
            min="1900"
            max="2023"
            name="year"
            onChange={changeYearHandler}
            value={inputYear}
          >
            <option value="" selected>
              Select Year
            </option>
            {yearOptions.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </form>
        <div className={styles.buttons}>
          <button className={styles.resetbtn} onClick={resetHandler}>
            RESET
          </button>
          <button className={styles.searchbtn} onClick={searchMovieHandler}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchForm;
