import React, { Fragment, useState } from "react";

import { Container, Row, Col } from "reactstrap";

import { Helmet, PersonalInformationComponent } from "../components";

import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [relativeName, setRelativeName] = useState("");

  const reset = () => {
    setName("");
    setId("");
    setCode("");
    setBirth("");
    setAge("");
    setStatus("");
    setAddress("");
    setPhone("");
    setEmail("");
    setHomeNumber("");
    setRelativeName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    reset();
  };

  return (
    <Helmet title="Personal Information">
      <section className="personal__information">
        <Container style={{ maxWidth: "100%" }}>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12" className="pe-0 pe-sm-3 pe-xs-4">
              <PersonalInformationComponent logout={true} />
            </Col>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1 className="">Personal Information</h1>
              </div>
            </Col>
            <Col lg="12" className="mt-4 col__form">
              <div className="form__container">
                <form
                  className="form"
                  action=""
                  method="post"
                  onSubmit={submitHandler}
                >
                  <Row className="d-flex justify-align-center justify-content-start">
                    <Col lg="12">
                      <Col lg="4" className="pe-0 pe-lg-3">
                        <div className="form__group">
                          <label className="form__label" htmlFor="name">
                            Name
                          </label>
                          {true ? (
                            <p className="form-editing-field table__input mb-0">
                              Name
                            </p>
                          ) : (
                            <input
                              className="form__input"
                              type="text"
                              placeholder="Enter your name"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          )}
                        </div>
                      </Col>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="id">
                          ID
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            123456
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your id"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="code">
                          Code
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            123456
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your code"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="birth">
                          Date of Birth
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            20/8/1995
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your date of birth"
                            id="birth"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="age">
                          Age
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            30
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your age"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="status">
                          Marital status
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            single
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your marital status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="address">
                          Address
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            Mansoura
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="12" className="mt-5 mb-4">
                      <div className="page__title contact__information">
                        <h1 className="">Contact Information</h1>
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="phone">
                          Phone number
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            01234567891
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="email">
                          E-mail
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            email@gmail.com
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5">
                      <div className="form__group">
                        <label className="form__label" htmlFor="homeNumber">
                          Home number
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            01234567891
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your date of home number"
                            id="homeNumber"
                            value={homeNumber}
                            onChange={(e) => setHomeNumber(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg="4" className="me-5 mb-3">
                      <div className="form__group">
                        <label className="form__label" htmlFor="relativeName">
                          Relative name
                        </label>
                        {true ? (
                          <p className="form-editing-field table__input mb-0">
                            Name
                          </p>
                        ) : (
                          <input
                            className="form__input"
                            type="text"
                            placeholder="Enter your relative name"
                            id="relativeName"
                            value={relativeName}
                            onChange={(e) => setRelativeName(e.target.value)}
                          />
                        )}
                      </div>
                    </Col>
                    <Col
                      lg="12"
                      className="col__submit d-flex justify-content-end align-items-center gap-sm-4 gap-3 mt-5"
                    >
                      {true ? (
                        <Fragment>
                          <button
                            type="button"
                            className="col-lg-2 col-4 edit__btn d-flex justify-content-center align-items-center gap-sm-2 gap-1"
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
                      ) : (
                        <button
                          type="submit"
                          className="col-lg-2 col-sm-3 col-4 save__btn me-1"
                        >
                          Save
                        </button>
                      )}
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

export default PersonalInformation;
