import React, { useState } from "react";
import styles from "./NavBar.module.css";

const NavBar = () => {
  //Nếu như sự kiện lăng chuột diễn ra trên page >100px từ đầu page thì navBar sẽ đổi màu dựa trên state navScrolled
  const [navScrolled, setNavScrolled] = useState(false);
  window.onscroll = function () {
    if (window.scrollY > 100) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };
  //Nếu click vào icon Search sẽ đến trang search và ấn vào MovieApp thì sẽ về trang chủ browse
  const landToSearchHander = () => {
    window.location.replace("/search");
  };
  const landToHomePage = () => {
    window.location.replace("/");
  };
  //JSX trả ra các thẻ div bao bọc và title Movie App cũng như icon Search, nếu navScrolled là true sẽ thêm style ScrollDown để đổi màu navbar
  return (
    <div>
      <div className={styles.container}>
        <div
          className={`${styles.navBarContainer} ${
            navScrolled ? styles.scrolldown : ""
          }`}
        >
          <h2 onClick={landToHomePage}>Movie App</h2>
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={landToSearchHander}
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
