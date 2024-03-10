import React, { Fragment, useEffect, useState } from "react";

import { Col, Container, Row } from "reactstrap";

import { Helmet, PersonalInformationComponent } from "../components";

import "../styles/gynecological-history.css";
import { boolean, date, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { TiArrowSortedUp } from "react-icons/ti";

import {
  addGynecologicalHistory,
  addGynecologicalHistoryData,
} from "../store/slices/gynecologicalHistorySlice";
import { toast } from "react-toastify";
import { getPatient } from "../store/slices/patientSlice";
import Http from "../Http";

const validationSchema = object().shape({
  date_of_last_period: date().nullable().min(new Date(1900, 0, 1)),
  menstrual_cycle_abnormalities: string(),
  contact_bleeding: string(),
  menopause: boolean(),
  menopause_age: number().min(1).max(150).when("menopause", {
    is: "true",
    then: number().required(),
  }),
  using_of_contraception: boolean(),
  contraception_method: string().when("using_of_contraception", {
    is: "true",
    then: string().required(),
  }),
  investigation_files: string(),
});
const initialValues = {
  date_of_last_period: "",
  menstrual_cycle_abnormalities: "",
  contact_bleeding: "",
  menopause: "",
  menopause_age: "",
  using_of_contraception: "",
  contraception_method: "",
  investigation_files: "",
};

const GynecologicalHistory = () => {
  const { data: patient, loading } = useSelector((state) => state.patient);
  const {
    gynecologicalHistory,
    loading: loadingGynecologicalHistory,
    error,
    newGynecologicalHistory,
  } = useSelector((state) => state.gynecologicalHistory);
  const dispatch = useDispatch();
  const location = useLocation();
  const patient_code = location.pathname.split("/")[2];
  const [variables, setVariables] = useState({
    isEditing: false,
    isActive: false,
    selected: `Choose method`,
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelper) => {
      dispatch(
        addGynecologicalHistory({
          ...values,
          patient_id: patient.id,
          using_of_contraception:
            values.using_of_contraception === "true" ? true : false,
          menopause: values.menopause === "true" ? true : false,
          contact_bleeding: values.contact_bleeding === "true" ? true : false,
        })
      ).then(() => {
        dispatch(
          addGynecologicalHistoryData({
            ...values,
            patient_id: patient.id,
            using_of_contraception:
              values.using_of_contraception === "true" ? true : false
            ,
            menopause: values.menopause === "true" ? true : false,
            contact_bleeding: values.contact_bleeding === "true" ? true : false,
          })
        );
        setVariables({ ...variables, isEditing: false });
        formik.resetForm();
        formikHelper.resetForm();
      });
    },
  });

  // Select handler
  const selectHandler = (e) => {
    setVariables({
      ...variables,
      selected: e.target.textContent,
      isActive: false,
    });
    formik.setValues({
      ...formik.values,
      contraception_method: e.target.textContent,
    });
  };

  // Input handler
  const inputHandler = (e) => {
    formik.handleChange(e);
  };

  // Fetch patient data using patient_code and dispatch the action
  useEffect(() => {
    dispatch(getPatient(patient_code));
  }, [dispatch, patient_code]);

  // SetValues in the formik
  useEffect(() => {
    formik.setValues(gynecologicalHistory);
    if (newGynecologicalHistory.length !== 0) {
      formik.setValues(newGynecologicalHistory);
    }
  }, [variables.isEditing, newGynecologicalHistory]);

  return (
    <Helmet title="Gynecological history">
      <section className="gynecological__history">
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
            {gynecologicalHistory && (
              <Col lg="12" className="mt-3 mb-2">
                <div className="page__title">
                  <h1>Gynecological history</h1>
                </div>
              </Col>
            )}
            {/* No Data to show */}
            {loadingGynecologicalHistory && (
              <Col lg="12" className="col__form text-center mt-5 pt-5">
                <div
                  className="spinner-border text-primary mt-5"
                  role="status"
                />
              </Col>
            )}
            {error === true &&
              Object.keys(newGynecologicalHistory).length === 0 && (
                <Col lg="12" className="mt-4">
                  <div className="no__data">
                    <p className="text-center">Failed to load data</p>
                  </div>
                </Col>
              )}
            {Object.keys(gynecologicalHistory).length === 0 &&
            Object.keys(newGynecologicalHistory).length === 0
              ? variables.isEditing === false &&
                loadingGynecologicalHistory === false && (
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
                          onClick={() =>
                            setVariables({ ...variables, isEditing: true })
                          }
                        >
                          Add Gynecological history data
                        </span>
                      </h1>
                    </div>
                  </Col>
                )
              : null}
            {Object.keys(gynecologicalHistory).length > 0 ||
              (Object.keys(newGynecologicalHistory).length > 0 &&
                variables.isEditing === false && (
                  <Col lg="12" className="mt-4 col__form">
                    <div className="form__container">
                      <form
                        className="form ps-2 ps-lg-4"
                        action=""
                        method="post"
                      >
                        <Row className="d-flex justify-align-center justify-content-start gap-4 ps-0 ps-lg-3">
                          <Col lg="12">
                            <Col lg="4" className="pe-0 pe-lg-3">
                              <div className="form__group">
                                <label
                                  className="form__label"
                                  htmlFor="dateOfLastPeriod"
                                >
                                  Date of last period
                                </label>
                                <p className="form-editing-field table__input mb-0">
                                  {gynecologicalHistory?.date_of_last_period ||
                                    newGynecologicalHistory?.date_of_last_period || (
                                      <span className="fs-6">
                                        No date of last period
                                      </span>
                                    )}
                                </p>
                              </div>
                            </Col>
                          </Col>
                          <Col lg="12">
                            <Col lg="4" className="pe-0 pe-lg-3">
                              <div className="form__group">
                                <label
                                  className="form__label"
                                  htmlFor="menstrualCycleAbnormalities"
                                >
                                  Menstrual cycle abnormalities
                                </label>
                                <p className="form-editing-field table__input mb-0">
                                  {gynecologicalHistory?.menstrual_cycle_abnormalities ||
                                    newGynecologicalHistory?.menstrual_cycle_abnormalities || (
                                      <span className="fs-6">
                                        No menstrual cycle abnormalities
                                      </span>
                                    )}
                                </p>
                              </div>
                            </Col>
                          </Col>
                          <Col lg="12">
                            <Col lg="4" className="pe-0 pe-lg-3">
                              <div className="form__group">
                                <label className="form__label">
                                  Contact bleeding
                                </label>
                                <p className="form-editing-field table__input mb-0">
                                  {gynecologicalHistory?.contact_bleeding ||
                                    newGynecologicalHistory?.contact_bleeding || (
                                      <span className="fs-6">
                                        No contact bleeding
                                      </span>
                                    )}
                                </p>
                              </div>
                            </Col>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label">Menopause</label>
                              <p className="form-editing-field table__input mb-0">
                                {gynecologicalHistory?.menopause ||
                                  newGynecologicalHistory?.menopause || (
                                    <span className="fs-6">No menopause</span>
                                  )}
                              </p>
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="mentionAge"
                              >
                                If yes , mention Age
                              </label>
                              <p className="form-editing-field table__input mb-0">
                                {gynecologicalHistory?.menopause_age ||
                                  newGynecologicalHistory?.menopause_age || (
                                    <span className="fs-6">
                                      No menopause age
                                    </span>
                                  )}
                              </p>
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label">
                                Using of contraception
                              </label>
                              <p className="form-editing-field table__input mb-0">
                                {gynecologicalHistory?.using_of_contraception ||
                                  newGynecologicalHistory?.using_of_contraception || (
                                    <span className="fs-6">
                                      No using of contraception
                                    </span>
                                  )}
                              </p>
                            </div>
                          </Col>
                          <Col lg="12" className="me-5">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="mentionMethod"
                              >
                                If yes , mention the method
                              </label>
                              <p className="form-editing-field table__input mb-0">
                                {gynecologicalHistory?.contraception_method ||
                                  newGynecologicalHistory?.contraception_method || (
                                    <span className="fs-6">
                                      No contraception method
                                    </span>
                                  )}
                              </p>
                            </div>
                          </Col>
                          <Col
                            lg="12"
                            className="col__submit d-flex justify-content-end align-items-center gap-sm-4 gap-3 mt-5"
                          >
                            <button
                              type="button"
                              className="col-lg-2 col-4 edit__btn d-flex justify-content-center align-items-center gap-sm-2 gap-1"
                              onClick={() =>
                                setVariables({ ...variables, isEditing: true })
                              }
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
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </Col>
                ))}
            {variables.isEditing && (
              <Col lg="12" className="mt-4 col__form">
                <div className="form__container">
                  <form className="form ps-2 ps-lg-4" action="" method="post">
                    <Row className="d-flex justify-align-center justify-content-start gap-4 ps-0 ps-lg-3">
                      <Col lg="12">
                        <Col lg="4" className="pe-0 pe-lg-3">
                          <div className="form__group">
                            <label
                              className="form__label"
                              htmlFor="dateOfLastPeriod"
                            >
                              Date of last period
                            </label>
                            <div className="text-danger">
                              {formik.touched.date_of_last_period &&
                              formik.errors.date_of_last_period
                                ? formik.errors.date_of_last_period
                                : ""}
                            </div>
                            <input
                              className="form__input"
                              type="date"
                              placeholder="Enter date of last period"
                              id="date_of_last_period"
                              name="date_of_last_period"
                              value={formik.values.date_of_last_period}
                              onChange={inputHandler}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                        </Col>
                      </Col>
                      <Col lg="12">
                        <Col lg="4" className="pe-0 pe-lg-3">
                          <div className="form__group">
                            <label
                              className="form__label"
                              htmlFor="menstrualCycleAbnormalities"
                            >
                              Menstrual cycle abnormalities
                            </label>
                            <div className="text-danger">
                              {formik.touched.menstrual_cycle_abnormalities &&
                              formik.errors.menstrual_cycle_abnormalities
                                ? formik.errors.menstrual_cycle_abnormalities
                                : ""}
                            </div>
                            <input
                              className="form__input"
                              type="text"
                              placeholder="Menstrual cycle abnormalities"
                              id="menstrual_cycle_abnormalities"
                              name="menstrual_cycle_abnormalities"
                              value={
                                formik.values.menstrual_cycle_abnormalities
                              }
                              onChange={inputHandler}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                        </Col>
                      </Col>
                      <Col lg="12">
                        <Col lg="4" className="pe-0 pe-lg-3">
                          <div className="form__group">
                            <label className="form__label">
                              Contact bleeding
                            </label>
                            <div className="text-danger">
                              {formik.touched.contact_bleeding &&
                              formik.errors.contact_bleeding
                                ? formik.errors.contact_bleeding
                                : ""}
                            </div>
                            <div className="form__radio-group">
                              <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                                <input
                                  className="form__input"
                                  type="radio"
                                  id="yes-contact-bleeding"
                                  name="contact_bleeding"
                                  value={true}
                                  checked={
                                    formik.values.contact_bleeding === true
                                      ? formik.values.contact_bleeding
                                      : null
                                  }
                                  onChange={inputHandler}
                                />
                                <label
                                  className="form__radio-label"
                                  htmlFor="yes-contact-bleeding"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                                <input
                                  className="form__input"
                                  type="radio"
                                  id="no-contact-bleeding"
                                  name="contact_bleeding"
                                  value={false}
                                  checked={
                                    formik.values.contact_bleeding === false
                                      ? formik.values.contact_bleeding
                                      : null
                                  }
                                  onChange={inputHandler}
                                />
                                <label
                                  className="form__radio-label"
                                  htmlFor="no-contact-bleeding"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label className="form__label">Menopause</label>
                          <div className="text-danger">
                            {formik.touched.menopause && formik.errors.menopause
                              ? formik.errors.menopause
                              : ""}
                          </div>
                          <div className="form__radio-group">
                            <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                              <input
                                className="form__input"
                                type="radio"
                                id="yes-menopause"
                                name="menopause"
                                value={true}
                                checked={
                                  formik.values.menopause === true
                                    ? formik.values.menopause
                                    : null
                                }
                                onChange={inputHandler}
                              />
                              <label
                                className="form__radio-label"
                                htmlFor="yes-menopause"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                              <input
                                className="form__input"
                                type="radio"
                                id="no-menopause"
                                name="menopause"
                                value={false}
                                checked={
                                  formik.values.menopause === false
                                    ? formik.values.menopause
                                    : null
                                }
                                onChange={(e) => {
                                  inputHandler(e);
                                  formik.setValues({
                                    ...formik.values,
                                    menopause_age: "",
                                    menopause: e.target.value,
                                  });
                                }}
                              />
                              <label
                                className="form__radio-label"
                                htmlFor="no-menopause"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label
                            className="form__label"
                            htmlFor="menopause_age"
                          >
                            If yes , mention Age
                          </label>
                          <div className="text-danger">
                            {formik.touched.menopause_age &&
                            formik.errors.menopause_age
                              ? formik.errors.menopause_age
                              : ""}
                            {formik.values.menopause === "true" ? (
                              formik.values.menopause_age === "" ? (
                                <span className="fs-6">
                                  Enter menopause age
                                </span>
                              ) : null
                            ) : null}
                          </div>
                          <input
                            className={`form__input ${
                              formik.values.menopause === "false" ||
                              formik.values.menopause === ""
                                ? "disabled"
                                : "enabled"
                            }`}
                            type="text"
                            placeholder="Enter menopause age"
                            id="menopause_age"
                            name="menopause_age"
                            disabled={
                              formik.values.menopause === "false" ||
                              formik.values.menopause === ""
                            }
                            value={formik.values.menopause_age}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label className="form__label">
                            Using of contraception
                          </label>
                          <div className="text-danger">
                            {formik.touched.using_of_contraception &&
                            formik.errors.using_of_contraception
                              ? formik.errors.using_of_contraception
                              : ""}
                          </div>
                          <div className="form__radio-group">
                            <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                              <input
                                className="form__input"
                                type="radio"
                                id="yes-contraception"
                                name="using_of_contraception"
                                value={true}
                                checked={
                                  formik.values.using_of_contraception === true
                                    ? formik.values.using_of_contraception
                                    : null
                                }
                                onChange={inputHandler}
                              />
                              <label
                                className="form__radio-label"
                                htmlFor="yes-contraception"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="form__radio d-flex justify-content-start align-items-center gap-2">
                              <input
                                className="form__input"
                                type="radio"
                                id="no-contraception"
                                name="using_of_contraception"
                                value={false}
                                checked={
                                  formik.values.using_of_contraception === false
                                    ? formik.values.using_of_contraception
                                    : null
                                }
                                onChange={(e) => {
                                  inputHandler(e);
                                  setVariables({
                                    ...variables,
                                    selected: `Choose method`,
                                  });
                                }}
                              />
                              <label
                                className="form__radio-label"
                                htmlFor="no-contraception"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="4" className="me-5">
                        <div className="form__group">
                          <label
                            className="form__label"
                            htmlFor="mentionMethod"
                          >
                            If yes , mention the method
                          </label>
                          <div className="text-danger">
                            {formik.touched.contraception_method &&
                            formik.errors.contraception_method
                              ? formik.errors.contraception_method
                              : ""}
                            {formik.values.using_of_contraception === "true" ? (
                              variables.selected === "Choose method" ? (
                                <span className="fs-6">Choose method</span>
                              ) : null
                            ) : null}
                          </div>
                          <div className="dropdown">
                            <div
                              className={`dropdown-btn ${
                                formik.values.using_of_contraception === "true"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setVariables({
                                  ...variables,
                                  isActive: !variables.isActive,
                                })
                              }
                            >
                              {variables.selected}
                              <TiArrowSortedUp
                                className={`dropdown-icon ${
                                  variables.isActive ? "active" : ""
                                }`}
                              />
                            </div>
                            <div
                              className={`dropdown-content ${
                                variables.isActive ? "active" : ""
                              }`}
                            >
                              <div
                                onClick={selectHandler}
                                className="item"
                                value="pills"
                              >
                                Pills
                              </div>
                              <div
                                className="item"
                                value="iud"
                                onClick={selectHandler}
                              >
                                IUD
                              </div>
                              <div
                                className="item"
                                value="injectable"
                                onClick={selectHandler}
                              >
                                Injectable
                              </div>
                              <div
                                className="item"
                                value="other"
                                onClick={selectHandler}
                              >
                                Other
                              </div>
                            </div>
                          </div>
                        </div>
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
                        {variables.isEditing ? (
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
                              onClick={() =>
                                setVariables({ ...variables, isEditing: false })
                              }
                            >
                              Cancel
                            </button>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <button
                              type="button"
                              className="col-lg-2 col-4 edit__btn d-flex justify-content-center align-items-center gap-sm-2 gap-1"
                              onClick={() =>
                                setVariables({ ...variables, isEditing: true })
                              }
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

export default GynecologicalHistory;
