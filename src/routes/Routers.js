import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Home, Patient } from "../pages";

const Routers = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient" element={<Patient />} />
    </Routes>
  );
};

export default Routers;
