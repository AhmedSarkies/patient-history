import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Login,
  Home,
  AddPatient,
  Patient,
  PersonalInformation,
  GeneralExamination,
  GynecologicalHistory,
  PatientObstetricsHistory,
  PatientOvarianCancer,
  PatientUterineCancer,
  PatientOsteoporosis,
  PatientPreEclampsia,
  PatientBreastCancer,
  PatientCervicalCancer,
} from "../pages";

const itemsPatient = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "add-patient",
    element: <AddPatient />,
  },
  {
    path: "personal-information/:id",
    element: <PersonalInformation />,
  },
  {
    path: "general-examination/:id",
    element: <GeneralExamination />,
  },
  {
    path: "gynecological-history/:id",
    element: <GynecologicalHistory />,
  },
  {
    path: "obstetrics-history/:id",
    element: <PatientObstetricsHistory />,
  },
  {
    path: "cervical-cancer/:id",
    element: <PatientCervicalCancer />,
  },
  {
    path: "breast-cancer/:id",
    element: <PatientBreastCancer />,
  },
  {
    path: "ovarian-cancer/:id",
    element: <PatientOvarianCancer />,
  },
  {
    path: "uterine-cancer/:id",
    element: <PatientUterineCancer />,
  },
  {
    path: "osteoporosis/:id",
    element: <PatientOsteoporosis />,
  },
  {
    path: "pre-eclampsia/:id",
    element: <PatientPreEclampsia />,
  },
];

const Routers = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-patient" element={<AddPatient />} />
      <Route path="" element={<Patient />}>
        {itemsPatient.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routers;
