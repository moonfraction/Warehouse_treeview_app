import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export const Context = React.createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
