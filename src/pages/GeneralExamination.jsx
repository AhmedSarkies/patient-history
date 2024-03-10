import React, { Fragment, useEffect, useState } from "react";
import { Helmet, PersonalInformationComponent } from "../components";
import { Col, Container, Row } from "reactstrap";

import "../styles/general-examination.css";
import { getPatient } from "../store/slices/patientSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { number, object, string } from "yup";
import {
  addGeneralExamination,
  addGeneralExaminationData,
} from "../store/slices/generalExaminationSlice";

const dataSchema = object().shape({
  height: number("Invalid height format (170)"),
  weight: number("Invalid weight format (70)"),
  pulse: number("Invalid pulse format (70)"),
  random_blood_sugar: string().matches(
    /^[0-9]+$/,
    "Invalid blood sugar format (120)"
  ),
  blood_pressure: string().matches(
    /^[0-9]+\/[0-9]+$/,
    "Invalid blood pressure format (120/60)"
  ),
  investigation_files: string(),
});

const PatientGeneralExamination = () => {
  const { data: patient, loading } = useSelector((state) => state.patient);
  const {
    generalExamination,
    loading: loadingGeneralExamination,
    error,
    newGeneralExamination,
  } = useSelector((state) => state.generalExamination);
  const dispatch = useDispatch();
  const location = useLocation();
  const patient_code = location.pathname.split("/")[2];
  const [isEditing, setIsEditing] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      height: "",
      pulse: "",
      weight: "",
      random_blood_sugar: "",
      blood_pressure: "",
      investigation_files: "",
    },
    validationSchema: dataSchema,
    onSubmit: (values, formikHelper) => {
      try {
        dispatch(addGeneralExamination({ ...values, patient_id: patient?.id }));
        dispatch(
          addGeneralExaminationData({ ...values, patient_id: patient?.id })
        );
        setIsEditing(false);
        formik.resetForm();
        formikHelper.resetForm();
        toast.success("General examination data updated successfully");
      } catch (error) {
        toast.error("Failed to update general examination data");
      }
    },
  });

  console.log("hello");

  // Input handler
  const inputHandler = (e) => {
    formik.handleChange(e);
  };

  // Fetch patient data using patient_code and dispatch the action
  useEffect(() => {
    dispatch(getPatient(patient_code));
  }, [dispatch, patient_code]);

  // Set formik values to newGeneralExamination
  useEffect(() => {
    if (newGeneralExamination) {
      formik.setValues(newGeneralExamination);
    }
  }, [isEditing]);

  return (
    <Helmet title="General Examination">
      <section className="general__examination">
        <Container style={{ maxWidth: "100%" }}>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12" className="pe-0 pe-sm-3 pe-xs-4">
              <PersonalInformationComponent
                logout={true}
                patient={
                  loading
                    ? false
                    : error
                    ? false
                    : patient.length === 0
                    ? false
                    : true
                }
              />
            </Col>
            {generalExamination && (
              <Col lg="12" className="mt-3 mb-2">
                <div className="page__title">
                  <h1>General examination</h1>
                </div>
              </Col>
            )}
            {/* No Data to show */}
            {loadingGeneralExamination && (
              <Col lg="12" className="col__form text-center mt-5 pt-5">
                <div
                  className="spinner-border text-primary mt-5"
                  role="status"
                />
              </Col>
            )}
            {error === true && (
              <Col lg="12" className="mt-4">
                <div className="no__data">
                  <p className="text-center">Failed to load data</p>
                </div>
              </Col>
            )}
            {Object.keys(newGeneralExamination).length === 0 ||
            Object.keys(generalExamination).length === 0
              ? isEditing === false &&
                loadingGeneralExamination === false && (
                  <Col lg="12" className="mt-4 pt-5">
                    <div className="no__data page__title mt-5">
                      <h1 className="text-center f-4">
                        No data to show,{" "}
                        <span
                          className="text-primary fs-5"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => setIsEditing(true)}
                        >
                          Add general examination data
                        </span>
                      </h1>
                    </div>
                  </Col>
                )
              : null}
            {isEditing && (
              <Col lg="12" className="mt-4 col__form">
                <div className="form__container">
                  <form className="form" action="" method="post">
                    <Row className="d-flex justify-align-center justify-content-start">
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label className="form__label" htmlFor="height">
                            Height (cm)
                          </label>
                          <div className="text-danger">
                            {formik.touched.height && formik.errors.height
                              ? formik.errors.height
                              : ""}
                          </div>
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter height in cm"
                            id="height"
                            name="height"
                            value={formik.values.height}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label className="form__label" htmlFor="pulse">
                            Pulse
                          </label>
                          <div className="text-danger">
                            {formik.touched.pulse && formik.errors.pulse
                              ? formik.errors.pulse
                              : ""}
                          </div>
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter pulse rate in bpm"
                            id="pulse"
                            name="pulse"
                            value={formik.values.pulse}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label className="form__label" htmlFor="weight">
                            Weight (Kg)
                          </label>
                          <div className="text-danger">
                            {formik.touched.weight && formik.errors.weight
                              ? formik.errors.weight
                              : ""}
                          </div>
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter weight in kg"
                            id="weight"
                            name="weight"
                            value={formik.values.weight}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label
                            className="form__label"
                            htmlFor="randomBloodSugar"
                          >
                            Random blood sugar
                          </label>
                          <div className="text-danger">
                            {formik.touched.random_blood_sugar &&
                            formik.errors.random_blood_sugar
                              ? formik.errors.random_blood_sugar
                              : ""}
                          </div>
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter random blood sugar in mg/dL"
                            id="random_blood_sugar"
                            name="random_blood_sugar"
                            value={formik.values.random_blood_sugar}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                      <Col lg="12">
                        <Col lg="4" className="pe-0 pe-lg-3">
                          <div className="form__group">
                            <label
                              className="form__label"
                              htmlFor="bloodPressure"
                            >
                              Blood pressure
                            </label>
                            <div className="text-danger">
                              {formik.touched.blood_pressure &&
                              formik.errors.blood_pressure
                                ? formik.errors.blood_pressure
                                : ""}
                            </div>
                            <input
                              className="form__input"
                              type="text"
                              placeholder="Enter blood pressure in mmHg"
                              id="blood_pressure"
                              name="blood_pressure"
                              value={formik.values.blood_pressure}
                              onChange={inputHandler}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                        </Col>
                      </Col>
                      <Col lg="12">
                        <Col lg="4" md="6" sm="8" className="pe-0 pe-lg-3">
                          <div className="form__group">
                            <label
                              className="form__label"
                              htmlFor="investigation"
                            >
                              Investigation
                            </label>
                            <label
                              className="form__label form__label-file"
                              htmlFor="investigation"
                            >
                              {formik.values.investigation ? (
                                formik.values.investigation.split(`\\`).pop()
                              ) : (
                                <Fragment>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                                      fill="#f0f0f0"
                                    />
                                  </svg>
                                  Upload File
                                </Fragment>
                              )}
                            </label>
                            <input
                              className="form__input form__input-file"
                              type="file"
                              placeholder=""
                              id="investigation"
                              value={formik.values.investigation}
                              onChange={inputHandler}
                              accept="application/pdf, image/*"
                            />
                          </div>
                        </Col>
                      </Col>
                      <Col
                        lg="12"
                        className="col__submit d-flex justify-content-end align-items-center gap-sm-4 gap-3 mt-5"
                      >
                        {isEditing ? (
                          <Fragment>
                            <button
                              type="button"
                              className="col-lg-2 col-4 save__btn"
                              onClick={formik.handleSubmit}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="col-lg-2 col-4 cancel__btn"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </button>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <button
                              type="button"
                              className="col-lg-2 col-4 edit__btn d-flex justify-content-center align-items-center gap-sm-2 gap-1"
                              onClick={() => setIsEditing(true)}
                            >
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.954 6.921 20.862 7.163C20.77 7.405 20.6243 7.62567 20.425 7.825L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5L16.2 6.4L17.6 7.8Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="col-lg-3 col-sm-5 col-8 download__btn save__btn d-flex justify-content-center align-items-center gap-2"
                              onClick={() => window.print()}
                            >
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                              Download a copy
                            </button>
                          </Fragment>
                        )}
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            )}
            {(Object.keys(newGeneralExamination).length > 0 ||
              Object.keys(generalExamination).length > 0) &&
              isEditing === false && (
                <Col lg="12" className="mt-4 col__form">
                  <div className="form__container">
                    <form className="form" action="" method="post">
                      <Row className="d-flex justify-align-center justify-content-start">
                        <Col lg="4" className="me-5">
                          <div className="form__group">
                            <label className="form__label" htmlFor="height">
                              Height (cm)
                            </label>
                            <p className="form-editing-field table__input mb-0">
                              {generalExamination?.height ||
                                newGeneralExamination?.height}
                            </p>
                          </div>
                        </Col>
                        <Col lg="4" className="me-5">
                          <div className="form__group">
                            <label className="form__label" htmlFor="pulse">
                              Pulse
                            </label>
                            <p className="form-editing-field table__input mb-0">
                              {generalExamination?.pulse ||
                                newGeneralExamination?.pulse}
                            </p>
                          </div>
                        </Col>
                        <Col lg="4" className="me-5">
                          <div className="form__group">
                            <label className="form__label" htmlFor="weight">
                              Weight (Kg)
                            </label>
                            <p className="form-editing-field table__input mb-0">
                              {generalExamination?.weight ||
                                newGeneralExamination?.weight}
                            </p>
                          </div>
                        </Col>
                        <Col lg="4" className="me-5">
                          <div className="form__group">
                            <label
                              className="form__label"
                              htmlFor="randomBloodSugar"
                            >
                              Random blood sugar
                            </label>
                            <p className="form-editing-field table__input mb-0">
                              {generalExamination?.random_blood_sugar ||
                                newGeneralExamination?.random_blood_sugar}
                            </p>
                          </div>
                        </Col>
                        <Col lg="12">
                          <Col lg="4" className="pe-0 pe-lg-3">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="bloodPressure"
                              >
                                Blood pressure
                              </label>
                              <p className="form-editing-field table__input mb-0">
                                {generalExamination?.blood_pressure ||
                                  newGeneralExamination?.blood_pressure}
                              </p>
                            </div>
                          </Col>
                        </Col>
                        <Col lg="12">
                          <Col lg="4" md="6" sm="8" className="pe-0 pe-lg-3">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="investigation"
                              >
                                Investigation
                              </label>
                              <label
                                className="form__label form__label-file"
                                htmlFor="investigation"
                              >
                                {formik.values.investigation ? (
                                  formik.values.investigation.split(`\\`).pop()
                                ) : (
                                  <Fragment>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                                        fill="#f0f0f0"
                                      />
                                    </svg>
                                    Upload File
                                  </Fragment>
                                )}
                              </label>
                              <input
                                className="form__input form__input-file"
                                type="file"
                                placeholder=""
                                id="investigation"
                                value={formik.values.investigation}
                                onChange={inputHandler}
                                accept="application/pdf, image/*"
                              />
                            </div>
                          </Col>
                        </Col>
                        <Col
                          lg="12"
                          className="col__submit d-flex justify-content-end align-items-center gap-sm-4 gap-3 mt-5"
                        >
                          {isEditing ? (
                            <Fragment>
                              <button
                                type="button"
                                className="col-lg-2 col-4 save__btn"
                                onClick={formik.handleSubmit}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="col-lg-2 col-4 cancel__btn"
                                onClick={() => setIsEditing(false)}
                              >
                                Cancel
                              </button>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <button
                                type="button"
                                className="col-lg-2 col-4 edit__btn d-flex justify-content-center align-items-center gap-sm-2 gap-1"
                                onClick={() => setIsEditing(true)}
                              >
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.954 6.921 20.862 7.163C20.77 7.405 20.6243 7.62567 20.425 7.825L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5L16.2 6.4L17.6 7.8Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                                Edit
                              </button>
                              <button
                                type="button"
                                className="col-lg-3 col-sm-5 col-8 download__btn save__btn d-flex justify-content-center align-items-center gap-2"
                                onClick={() => window.print()}
                              >
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                                Download a copy
                              </button>
                            </Fragment>
                          )}
                        </Col>
                      </Row>
                    </form>
                  </div>
                </Col>
              )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PatientGeneralExamination;
