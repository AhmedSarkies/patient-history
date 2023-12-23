import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Home } from "../pages";

const Routers = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routers;
