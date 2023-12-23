import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Col, Container, Row } from "reactstrap";

import { Helmet } from "../components";

import logo from "../assets/images/logo-transparent.png";

import "../styles/home.css";

const Home = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Helmet title="">
      <section className="home">
        <Container className="d-flex flex-column justify-content-between align-items-center">
          <Row className="home__header">
            <Col lg="2" xs="4" className="d-flex justify-content-center">
              <div className="logo__container">
                <img src={logo} alt="logo" className="home__logo" />
              </div>
            </Col>
            <Col
              lg="10"
              xs="8"
              className="d-flex align-items-center justify-content-end"
            >
              <div className="home__btns w-100">
                <Link to="/login" className="add__patient">
                  <span>
                    <i className="ri-add-line"></i>
                  </span>
                  Add Patient
                </Link>
                <Link to="/login" className="home__login">
                  Login
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="home__content__container w-100">
            <Col xs="12">
              <div className="home__content text-center text-white">
                <h1 className="home__title">Search for patient</h1>
                <p className="home__text">
                  Search for a patient by name, email, or phone number, identify
                </p>
              </div>
            </Col>
            <Col xs="12">
              <div className="home__search text-center">
                <form className="search__form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search for a patient"
                    className="home__search__input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="search__btn">
                    <i className="ri-search-line"></i>
                  </button>
                  <br />
                  <button
                    type="submit"
                    className="home__search__btn search__btn mt-4"
                  >
                    Search By Code
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
