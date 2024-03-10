import React from "react";

import { Layout } from "./components";

import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const { data } = useSelector((state) => state.patient);

  return (
    <div className="App">
      <div id="printContent">
        <span className="patient-name m-0">
          {data?.name || data.patient?.name}
        </span>
        <span className="patient-id m-0">
          {data?.patient_code || data.patient?.patient_code}
        </span>
      </div>
      <Layout />
    </div>
  );
};

export default App;
