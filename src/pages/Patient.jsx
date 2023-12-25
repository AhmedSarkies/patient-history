import React from "react";

import { Outlet } from "react-router-dom";

import { Col, Container, Row } from "reactstrap";

import { Helmet, Navbar } from "../components";

const Patient = () => {
  return (
    <Helmet title="">
      <section className="patient">
        <Container
          style={{
            maxWidth: "100%",
            paddingLeft: "0px",
          }}
        >
          <Row>
            <Col xl="3">
              <Navbar />
            </Col>
            <Col xl="9">
              <div className="patient__content">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Patient;
