import React, { useContext, useEffect } from "react";
import { Context } from "./main";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./styles/common.css";

import Login from "./Pages/Login";
import Home from "./Pages/Home";


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