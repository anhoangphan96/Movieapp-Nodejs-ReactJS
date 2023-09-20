import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import "./ErrorPage.css";
const ErrorPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const userId = "User 01";
  const errorRoute = async () => {
    //Khi fetch local host backend sẽ đi qua các middleware và không có middleware chứa các router cụ thể, và đến router cuối cùng là router báo lỗi không có router phù hợp
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/?token=${process.env.REACT_APP_USER_TOKEN}&userId=${userId}`
    );
    const data = await response.json();
    setErrorMessage(data.message);
  };
  useEffect(() => {
    errorRoute();
  }, []);
  console.log(errorMessage);
  return (
    <div className="backgroundcontainer">
      <NavBar />
      <h2>{errorMessage}</h2>
    </div>
  );
};
export default ErrorPage;
