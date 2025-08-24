import React from "react";
import Sidebar from "./sidebar/sidebar.jsx";
import Main from "./main/main2.jsx";
import "./app.css"; // We'll add custom styles here
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <div className="sidebar-section">
          <Sidebar />
        </div>
        <div className="main-section">
          <Main />
        </div>
      </div>
    </>
  );
};

export default App;
