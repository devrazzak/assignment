import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "../pages/Details/Details";
import Edit from "../pages/Edit/Edit";
import Home from "../pages/Home/Home";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="main-layout">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
