import React from "react";

import { Container, Row, Col } from "reactstrap";

import { Helmet } from "../components";

import "../styles/personal-information.css";

const PersonalInformation = () => {
  return (
    <Helmet title="Personal Information">
      <section className="personal__information">
        <Container style={{ maxWidth: "100%" }}>
          <Row>
            <Col lg="12" className="pe-3">
              <div className="personal__information-info d-flex justify-content-end align-items-center gap-2 gap-sm-3 pe-0 pe-sm-3 pt-3">
                <h3 className="personal__information-name">Doctor’s name</h3>
                <img
                  className="personal__information-img"
                  src="https://via.placeholder.com/45"
                  alt="profile"
                />
              </div>
            </Col>
            <Col lg="12" className="mt-3">
              <div className="personal__information-title">
                <h1 className="">Personal Information</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PersonalInformation;
