import React from "react";

import { Layout } from "./components";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div id="printContent">
        <span className="patient-name m-0">Patient’s name</span>
        <span className="patient-id m-0">485967</span>
      </div>
      <Layout />
    </div>
  );
};

export default App;
