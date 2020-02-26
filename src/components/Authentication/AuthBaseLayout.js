import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { BackIcon } from '../../assets/svgs';
import MyStrings from '../../MyStrings.js';
import './AuthBaseLayout.css';

function AuthBaseLayout({ goBackRoute, children }) {
    return (
        <>
            <div className="bg vh-100"></div>
            <Container className="content">
                <Row className="justify-content-center mt-5 mb-5">
                    <Col md="8" lg="5" >
                        <div className="my-card pt-5 pb-5 pl-3 pr-3 ">
                            <Row >
                                <Col className="text-center">
                                    <Link to="/">
                                        <img
                                            className="img-fluid mb-2"
                                            style={{ maxHeight: "45px" }}
                                            src={Logo}
                                            height={55}
                                            alt={MyStrings.logoAlt} />
                                    </Link>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col className="text-center">
                                    <Link to={goBackRoute ? goBackRoute : "/"}><BackIcon /></Link>
                                </Col>
                            </Row>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AuthBaseLayout;