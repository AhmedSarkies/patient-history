import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import { useFormik } from "formik";

import { string, number, date, object } from "yup";

import { Container, Row, Col } from "reactstrap";

import { Helmet, PersonalInformationComponent } from "../components";

import { toast } from "react-toastify";

import {
  addPatientData,
  getPatient,
  updatePatient,
} from "../store/slices/patientSlice";

import "../styles/personal-information.css";

const validationSchema = object().shape({
  name: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  national_id: number("National ID must be number")
    .required("National ID is required")
    .positive()
    .integer()
    .min(10000000000000, "National ID must be 14 digits")
    .max(99999999999999, "National ID must be 14 digits"),
  // Schema for date of birth
  date_of_birth: date()
    .nullable()
    .min(new Date(1900, 0, 1))
    .required("Date of birth is required"),
  age: number("Age must be number")
    .required("Age is required")
    .positive()
    .integer()
    .min(0, "Age must be greater than 0"),
  address: string().required("Address is required"),
  marital_state: string().required("Marital state is required"),
  phone_number: number("Relative phone must be number")
    .required("Relative phone is required")
    .positive()
    .integer()
    .min(1000000000, "Relative phone must be 11 digits")
    .max(99999999999, "Relative phone must be 11 digits"),
  relative_phone: number("Relative phone must be number")
    .required("Relative phone is required")
    .positive()
    .integer()
    .min(1000000000, "Relative phone must be 11 digits")
    .max(99999999999, "Relative phone must be 11 digits"),
  relative_name: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Relative name is required"),
});

const initialValues = {
  name: "",
  national_id: "",
  date_of_birth: "",
  age: "",
  address: "",
  marital_state: "",
  relative_phone: "",
  relative_name: "",
  phone_number: "",
};

const PatientPersonalInformation = () => {
  const {
    data: patient,
    newPatient,
    loading,
    error,
  } = useSelector((state) => state.patient);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelper) => {
      dispatch(updatePatient(values));
      // dispatch(addPatientData({ ...values, id: patient.id }));
      // setIsEditing(false);
      // formikHelper.resetForm();
    },
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const patient_code = location.pathname.split("/")[2];
  const [isEditing, setIsEditing] = useState(false);

  const inputHandler = (e) => {
    formik.handleChange(e);
  };

  // Fetch patient data using patient_code and dispatch the action
  useEffect(() => {
    dispatch(getPatient(patient_code));
  }, [dispatch, patient_code]);

  // SetValues in the formik
  useEffect(() => {
    formik.setValues(patient);
    if (newPatient.length !== 0) {
      formik.setValues(newPatient);
    }
  }, [isEditing, newPatient]);

  return (
    <Helmet title="Personal Information">
      <section className="personal__information">
        <Container style={{ maxWidth: "100%" }}>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12">
              <PersonalInformationComponent
                logout={true}
                patient={loading ? false : error ? false : true}
              />
            </Col>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1>Personal Information</h1>
              </div>
            </Col>
            {
              // If loading is true, display a loading spinner
              loading ? (
                <Col lg="12" className="col__form text-center mt-5 pt-5">
                  <div
                    className="spinner-border text-primary mt-5"
                    role="status"
                  />
                </Col>
              ) : error ? (
                <div className="not-found mt-5">
                  <div className="page__title d-flex justify-content-center align-items-center">
                    <h1>
                      Patient is not found,{" "}
                      <Link to={"/"} replace>
                        Go back
                      </Link>
                    </h1>
                  </div>
                </div>
              ) : (
                <Fragment>
                  <Col lg="12" className="mt-4 col__form">
                    <div className="form__container">
                      <form className="form" method="post">
                        <Row className="d-flex justify-align-center justify-content-start">
                          <Col lg="12">
                            <Col lg="4" className="pe-0 pe-lg-3">
                              <div className="form__group">
                                <label className="form__label" htmlFor="name">
                                  Name
                                </label>
                                {isEditing ? (
                                  <Fragment>
                                    <div className="text-danger">
                                      {formik.touched.name && formik.errors.name
                                        ? formik.errors.name
                                        : ""}
                                    </div>
                                    <input
                                      className="form__input"
                                      type="text"
                                      placeholder="Enter your name"
                                      id="name"
                                      name="name"
                                      // defaultValue={patient?.name}
                                      value={formik.values.name}
                                      onChange={inputHandler}
                                      onBlur={formik.handleBlur}
                                    />
                                  </Fragment>
                                ) : (
                                  <p className="form-editing-field table__input mb-0">
                                    {patient?.name
                                      ? patient?.name
                                      : newPatient?.name}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="id">
                                ID
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.national_id &&
                                    formik.errors.national_id
                                      ? formik.errors.national_id
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your national ID"
                                    id="national_id"
                                    name="national_id"
                                    // defaultValue={patient?.national_id}
                                    value={formik.values.national_id}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.national_id
                                    ? patient?.national_id
                                    : newPatient?.national_id}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="birth">
                                Date of Birth
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.date_of_birth &&
                                    formik.errors.date_of_birth
                                      ? formik.errors.date_of_birth
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="date"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    // defaultValue={patient?.date_of_birth}
                                    value={formik.values.date_of_birth}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.date_of_birth
                                    ? patient?.date_of_birth
                                    : newPatient?.date_of_birth}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="age">
                                Age
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.age && formik.errors.age
                                      ? formik.errors.age
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your age"
                                    id="age"
                                    name="age"
                                    // defaultValue={patient?.age}
                                    value={formik.values.age}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.age
                                    ? patient?.age
                                    : newPatient?.age}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="status">
                                Marital status
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.marital_state &&
                                    formik.errors.marital_state
                                      ? formik.errors.marital_state
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your marital status"
                                    id="marital_state"
                                    name="marital_state"
                                    // defaultValue={patient?.marital_state}
                                    value={formik.values.marital_state}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.marital_state
                                    ? patient?.marital_state
                                    : newPatient?.marital_state}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="address">
                                Address
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.address &&
                                    formik.errors.address
                                      ? formik.errors.address
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your address"
                                    id="address"
                                    name="address"
                                    // defaultValue={patient?.address}
                                    value={formik.values.address}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.address
                                    ? patient?.address
                                    : newPatient?.address}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="phoneNumber"
                              >
                                Phone Number
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.phone_number &&
                                    formik.errors.phone_number
                                      ? formik.errors.phone_number
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    id="phoneNumber"
                                    name="phone_number"
                                    // defaultValue={patient?.phone_number}
                                    value={formik.values.phone_number}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.phone_number
                                    ? patient?.phone_number
                                    : newPatient?.phone_number}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="12" className="mt-5 mb-4">
                            <div className="page__title contact__information">
                              <h1>Contact Information</h1>
                            </div>
                          </Col>
                          <Col lg="4" className="me-5 mb-3">
                            <div className="form__group">
                              <label
                                className="form__label"
                                htmlFor="relativeName"
                              >
                                Relative name
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.relative_name &&
                                    formik.errors.relative_name
                                      ? formik.errors.relative_name
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your relative name"
                                    id="relative_name"
                                    name="relative_name"
                                    // defaultValue={patient?.relative_name}
                                    value={formik.values.relative_name}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.relative_name
                                    ? patient?.relative_name
                                    : newPatient?.relative_name || (
                                        <span className="fs-6">
                                          No relative name
                                        </span>
                                      )}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg="4" className="me-5">
                            <div className="form__group">
                              <label className="form__label" htmlFor="phone">
                                Relative number
                              </label>
                              {isEditing ? (
                                <Fragment>
                                  <div className="text-danger">
                                    {formik.touched.relative_phone &&
                                    formik.errors.relative_phone
                                      ? formik.errors.relative_phone
                                      : ""}
                                  </div>
                                  <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Enter your relative phone number"
                                    id="relative_phone"
                                    name="relative_phone"
                                    // defaultValue={patient?.relative_phone}
                                    value={formik.values.relative_phone}
                                    onChange={inputHandler}
                                    onBlur={formik.handleBlur}
                                  />
                                </Fragment>
                              ) : (
                                <p className="form-editing-field table__input mb-0">
                                  {patient?.relative_phone
                                    ? patient?.relative_phone
                                    : newPatient?.relative_phone || (
                                        <span className="fs-6">
                                          No relative phone
                                        </span>
                                      )}
                                </p>
                              )}
                            </div>
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
                </Fragment>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PatientPersonalInformation;
