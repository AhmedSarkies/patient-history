import React, { Fragment, useState } from "react";

import { Col, Container, Row } from "reactstrap";

import { Helmet, PersonalInformationComponent } from "../components";

import "../styles/ovarian-cancer.css";

const PatientOvarianCancer = () => {
  return (
    <Helmet title="Ovarian Cancer">
      <section className="ovarian__cancer">
        <Container style={{ maxWidth: "100%" }}>
          <Row style={{ paddingBottom: "2.5rem" }}>
            <Col lg="12" className="pe-0 pe-sm-3 pe-xs-4">
              <PersonalInformationComponent logout={true} patient={true} />
            </Col>
            <Col lg="12" className="mt-3 mb-2">
              <div className="page__title">
                <h1>Ovarian Cancer</h1>
              </div>
            </Col>
            <Col lg="12" className="mt-4 col__form">
              <div className="form__container">
                <form className="form ps-2 ps-lg-4" action="" method="post">
                  <Row className="d-flex justify-align-center justify-content-start">
                    <Col lg="5" className="pe-3 pe-lg-5">
                      <Col md="12" className="pe-0 pe-lg-3">
                        <div className="form__group">
                          <label className="form__label">
                            Do you have a personal history of breast cancer?
                          </label>
                          <p className="form-editing-field table__input mb-0">
                            yes
                          </p>
                        </div>
                      </Col>
                      <Col md="12" className="pe-0 pe-lg-3">
                        <div className="form__group">
                          <label className="form__label">
                            Do you have one or more relatives with ovarian
                            cancer?
                          </label>
                          <p className="form-editing-field table__input mb-0">
                            yes
                          </p>
                        </div>
                      </Col>
                      <Col md="12" className="pe-0 pe-lg-3">
                        <div className="form__group">
                          <label className="form__label">
                            Do you have the BRCA1 or BRCA2 gene mutation or
                            Lynch syndrome - hereditary nonpolyposis colorectal
                            cancer (HNPCC)?
                          </label>
                          <p className="form-editing-field table__input mb-0">
                            yes
                          </p>
                        </div>
                      </Col>
                    </Col>
                    <Col lg="7">
                      <Row className="d-flex justify-content-start align-items-start gap-5">
                        <Col lg="11" md="12" className="table__container mt-3">
                          <Col lg="12" className="table__content mt-3">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th className="border-0"></th>
                                  <th className="cell__header">
                                    <span>Result</span>
                                  </th>
                                  <th className="cell__header">
                                    <span>Comments</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="cell__header__mean cell__header">
                                    <span>TVS</span>
                                  </td>
                                  <td className="cell__input">
                                    <p className="form-editing-field table__input mb-0">
                                      yes
                                    </p>
                                  </td>
                                  <td className="cell__input">
                                    <p className="form-editing-field table__input mb-0">
                                      yes
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="cell__header__mean cell__header">
                                    <span>CA-125</span>
                                  </td>
                                  <td className="cell__input">
                                    <p className="form-editing-field table__input mb-0">
                                      yes
                                    </p>
                                  </td>
                                  <td className="cell__input">
                                    <p className="form-editing-field table__input mb-0">
                                      yes
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                        </Col>
                        <Col lg="7" md="12">
                          <div className="form__group">
                            <label
                              className="form__label mb-2"
                              htmlFor="recommendations"
                            >
                              Recommendations
                            </label>
                            <p className="form-editing-field form-editing-field-textarea">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="12"
                      className="col__submit d-flex justify-content-end align-items-center gap-sm-4 gap-3 mt-5"
                    >
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

export default PatientOvarianCancer;
