import React, { useContext, useEffect } from "react";
import { Context } from "./main";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./styles/common.css";

import Login from "./Pages/Login";
import Home from "./Pages/Home";

/* doesnt matter in prod, because we pass it as arg*/
// export const BASE_URL = process.env.REACT_APP_API_URL
// export const BASE_URL =  import.meta.env.REACT_APP_API_URL;
// export const BASE_URL = "https://api.auth.localhost";
export const BASE_URL = "https://api.warehousetree.work.gd";



const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export { Context };
export default App;