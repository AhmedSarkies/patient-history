import React from "react";

import "./personal-information-component.css";

const PersonalInformationComponent = ({ logout, patient }) => {
  return (
    <div
      className={`${
        patient
          ? "d-flex flex-xl-row flex-column-reverse d-block justify-content-center align-items-center"
          : "d-flex justify-content-end"
      }`}
    >
      {patient && (
        <div className="col-xl-6 col-12 date-name-editing d-flex justify-content-between align-items-center gap-3 pe-md-3 pe-3 pt-4">
          <div className="date-name-editing d-flex flex-sm-row flex-column justify-content-sm-between justify-content-center align-items-sm-center align-items-start gap-3 pe-md-3 pe-3 pt-2">
            <span>Edited on : 20/8/2023</span>
            <span>Edited by : D. Ahmed Mohamed</span>
          </div>
        </div>
      )}
      <div
        className={`col-xl-6 col-12 personal__information-info d-flex justify-content-end align-items-center gap-2 gap-sm-3 pt-4 ${
          patient && "pe-md-3 pe-3"
        }`}
      >
        <h3 className="personal__information-name">Doctor’s name</h3>
        <img
          className="personal__information-img"
          src="https://via.placeholder.com/45"
          alt="profile"
        />
        {logout && <button className="logout__btn">Log Out</button>}
      </div>
    </div>
  );
};

export default PersonalInformationComponent;
