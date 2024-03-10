import React, { Fragment, useState } from "react";

import { Col, Container, Row } from "reactstrap";

import { Helmet, PersonalInformationComponent } from "../components";

const BreastCancer = () => {
  const [age, setAge] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [investigation, setInvestigation] = useState("");

  const reset = () => {
    setAge("");
    setFamilyHistory("");
    setInvestigation("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    reset();
  };

  return (
    <Helmet title="Breast Cancer">
      <section className="breast__cancer">
        <Container style={{ maxWidth: "100%" }}>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12" className="pe-0 pe-sm-3 pe-xs-4">
              <PersonalInformationComponent logout={true} patient={false} />
            </Col>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1>Breast Cancer</h1>
              </div>
            </Col>
            <Col lg="12" className="mt-4 col__form">
              <div className="form__container">
                <form
                  className="form ps-2 ps-lg-4"
                  action=""
                  method="post"
                  onSubmit={submitHandler}
                >
                  <Row className="d-flex justify-align-start justify-content-start gap-5 ps-0 ps-lg-3">
                    <Col lg="12" className="pe-3 pe-lg-5">
                      <Row className="d-flex justify-content-start align-items-center">
                        <Col lg="5">
                          <Col lg="9" md="12">
                            <div className="form__group">
                              <label className="form__label mb-2" htmlFor="age">
                                Age
                              </label>
                              {true ? (
                                <p className="form-editing-field">26-39</p>
                              ) : (
                                <select
                                  className="form__input"
                                  id="age"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                                >
                                  <option
                                    className="form__option"
                                    value=""
                                    defaultValue
                                    disabled
                                    style={{ display: "none" }}
                                  >
                                    Choose age
                                  </option>
                                  <option value="<=25">{"<= 25"}</option>
                                  <option value="26-39">26-39</option>
                                  <option value="40-49">40-49</option>
                                  <option value="50-70">50-70</option>
                                  <option value=">70">{"> 70"}</option>
                                </select>
                              )}
                            </div>
                          </Col>
                          <Col lg="9" md="12">
                            <div className="form__group">
                              <label
                                className="form__label mb-2"
                                htmlFor="familyHistory"
                              >
                                Family history
                              </label>
                              {true ? (
                                <p className="form-editing-field">26-39</p>
                              ) : (
                                <select
                                  className="form__input"
                                  id="familyHistory"
                                  value={familyHistory}
                                  onChange={(e) =>
                                    setFamilyHistory(e.target.value)
                                  }
                                >
                                  <option
                                    className="form__option"
                                    value=""
                                    defaultValue
                                    disabled
                                    style={{ display: "none" }}
                                  >
                                    Choose history
                                  </option>
                                  <option value="negative">Negative</option>
                                  <option value="positive2ndDegree">
                                    Positive in 2nd degree
                                  </option>
                                  <option value="positive1stDegree">
                                    Positive in 1st degree
                                  </option>
                                </select>
                              )}
                            </div>
                          </Col>
                        </Col>
                        {true ? (
                          <Col lg="12">
                            <div className="form__group col-lg-4 col-md-8 col-12">
                              <label
                                className="form__label mb-2"
                                htmlFor="recommendations"
                              >
                                Recommendations
                              </label>
                              <p className="form-editing-field form-editing-field-textarea">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard
                              </p>
                            </div>
                          </Col>
                        ) : (
                          <Col lg="4">
                            <div className="form__group">
                              <label
                                className="form__label mb-2"
                                htmlFor="recommendations"
                              >
                                Recommendations
                              </label>
                              <textarea
                                className="form__input col-12 col-lg-12 col-md-8"
                                placeholder="Enter your recommendations"
                                id="recommendations"
                                style={{
                                  minHeight: "130px",
                                  maxHeight: "130px",
                                  resize: "none",
                                }}
                                value={recommendations}
                                onChange={(e) =>
                                  setRecommendations(e.target.value)
                                }
                              ></textarea>
                            </div>
                          </Col>
                        )}
                      </Row>
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
                            {investigation ? (
                              investigation.split(`\\`).pop()
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
                                    fill="#F0F0F0"
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
                            value={investigation}
                            onChange={(e) => setInvestigation(e.target.value)}
                          />
                        </div>
                      </Col>
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

export default BreastCancer;
