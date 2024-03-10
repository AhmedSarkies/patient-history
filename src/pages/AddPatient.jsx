import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { string, number, date, object } from "yup";

import { Container, Row, Col } from "reactstrap";

import { toast } from "react-toastify";

import {
  addPatient,
  addPatientData,
  getPatients,
} from "../store/slices/patientSlice";

import { Helmet, PersonalInformationComponent } from "../components";

import "../styles/personal-information.css";

const dataSchema = object().shape({
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
  date_of_birth: date().required("Date of birth is required"),
  age: number("Age must be number")
    .required("Age is required")
    .positive()
    .integer()
    .min(0, "Age must be greater than 0"),
  address: string(),
  marital_state: string().required("Marital state is required"),
  relative_phone: number("Relative phone must be number")
    .positive()
    .integer()
    .min(1000000000, "Relative phone must be 11 digits")
    .max(99999999999, "Relative phone must be 11 digits"),
  phone_number: number("Relative phone must be number")
    .positive()
    .integer()
    .required("Relative phone is required")
    .min(1000000000, "Relative phone must be 11 digits")
    .max(99999999999, "Relative phone must be 11 digits"),
  relative_name: string().min(2, "Too Short!").max(50, "Too Long!"),
});

const AddPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.patient);
  const formik = useFormik({
    initialValues: {
      name: "",
      national_id: "",
      date_of_birth: "",
      age: "",
      address: "",
      marital_state: "",
      relative_phone: "",
      relative_name: "",
      phone_number: "",
    },
    validationSchema: dataSchema,
    onSubmit: (values, formikHelper) => {
      const nationalIds = data?.map((patient) => patient.national_id);
      const nationalIdExists = nationalIds.includes(formik.values.national_id);
      if (nationalIdExists) {
        formikHelper.setFieldError("national_id", "Patient already exists");
        toast.error("Patient already exists");
      } else {
        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("national_id", values.national_id);
          formData.append("date_of_birth", values.date_of_birth);
          formData.append("age", values.age);
          formData.append("address", values.address);
          formData.append("marital_state", values.marital_state);
          formData.append("relative_phone", values.relative_phone);
          formData.append("relative_name", values.relative_name);
          formData.append("phone_number", values.phone_number);
          dispatch(addPatient(formData));
        } catch (error) {
          toast.error("Failed to add patient");
        }
      }
    },
  });

  // Handler for input change
  const inputHandler = (e) => {
    formik.handleChange(e);
  };

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  return (
    <Helmet title="Personal Information">
      <section className="personal__information">
        <Container>
          <Col lg="12" className="pe-0 pe-sm-3 pe-xs-4">
            <PersonalInformationComponent logout={true} />
          </Col>
          <Row style={{ paddingBottom: "1rem" }}>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1>Add Patient</h1>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1>Personal Information</h1>
              </div>
            </Col>
            <Col lg="12" className="mt-4 col__form">
              <div className="form__container">
                <form
                  className="form"
                  action=""
                  method="post"
                  onSubmit={formik.handleSubmit}
                >
                  <Row className="d-flex justify-align-center justify-content-start">
                    <Col lg="12">
                      <Col lg="4" className="pe-0 pe-lg-3">
                        <div className="form__group">
                          <label className="form__label" htmlFor="name">
                            Name
                          </label>
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
                            value={formik.values.name}
                            onChange={inputHandler}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </Col>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="id">
                          ID
                        </label>
                        <div className="text-danger">
                          {formik.touched.national_id &&
                          formik.errors.national_id
                            ? formik.errors.national_id
                            : ""}
                        </div>
                        <input
                          className="form__input"
                          type="text"
                          placeholder="Enter your id"
                          id="id"
                          name="national_id"
                          value={formik.values.national_id}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="birth">
                          Date of Birth
                        </label>
                        <div className="text-danger">
                          {formik.touched.date_of_birth &&
                          formik.errors.date_of_birth
                            ? formik.errors.date_of_birth
                            : ""}
                        </div>
                        <input
                          className="form__input"
                          type="date"
                          placeholder="Enter your date of birth"
                          id="birth"
                          name="date_of_birth"
                          value={formik.values.date_of_birth}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="age">
                          Age
                        </label>
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
                          value={formik.values.age}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="status">
                          Marital status
                        </label>
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
                          id="status"
                          name="marital_state"
                          value={formik.values.marital_state}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="address">
                          Address
                        </label>
                        <div className="text-danger">
                          {formik.touched.address && formik.errors.address
                            ? formik.errors.address
                            : ""}
                        </div>
                        <input
                          className="form__input"
                          type="text"
                          placeholder="Enter your address"
                          id="address"
                          name="address"
                          value={formik.values.address}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="phoneNumber">
                          Phone Number
                        </label>
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
                          value={formik.values.phone_number}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="12" className="mt-5 mb-4">
                      <div className="page__title contact__information">
                        <h1>Contact Information</h1>
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="phone">
                          Relative number
                        </label>
                        <div className="text-danger">
                          {formik.touched.relative_phone &&
                          formik.errors.relative_phone
                            ? formik.errors.relative_phone
                            : ""}
                        </div>
                        <input
                          className="form__input"
                          type="text"
                          placeholder="Enter your phone"
                          id="phone"
                          name="relative_phone"
                          value={formik.values.relative_phone}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col lg="4" className="me-5 mb-3">
                      <div className="form__group">
                        <label className="form__label" htmlFor="relativeName">
                          Relative name
                        </label>
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
                          id="relativeName"
                          name="relative_name"
                          value={formik.values.relative_name}
                          onChange={inputHandler}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </Col>
                    <Col
                      lg="12"
                      className="col__submit d-flex justify-content-lg-end justify-content-center align-items-center gap-sm-4 gap-3 mt-5"
                    >
                      <button
                        type="submit"
                        className="save__btn"
                        style={{
                          padding: "3px 15px",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="edit__btn"
                        style={{
                          padding: "3px 15px",
                        }}
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddPatient;
