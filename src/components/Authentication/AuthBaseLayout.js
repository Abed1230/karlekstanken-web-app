import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import './AuthBaseLayout.css';
import { BackIcon } from '../../assets/svgs';
import TransparentButton from '../TransparentButton';

function AuthBaseLayout({ history, children }) {
    return (
        <>
            <div className="bg vh-100"></div>
            <Container className="content">
                <Row className="justify-content-center mt-5 mb-5">
                    <Col md="8" lg="5" >
                        <div className="my-card pt-5 pb-5 pl-3 pr-3 ">
                            <Row >
                                <Col className="text-center">
                                    <img
                                        className="img-fluid mb-2"
                                        style={{ maxHeight: "45px" }}
                                        src={Logo}
                                        height={55}
                                        alt="Kärlekstanken" />
                                    <hr />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col className="text-center">
                                    <TransparentButton variant="light" onClick={() => history.goBack()}><BackIcon /></TransparentButton>
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