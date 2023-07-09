import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Browse></Browse>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/search",
      element: <Search></Search>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
