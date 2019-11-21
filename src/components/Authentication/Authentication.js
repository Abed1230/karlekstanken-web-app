import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Logo from '../../logo.png';
import './Authentication.css';
import { Link } from 'react-router-dom';

function Authentication() {
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
                                        className="img-fluid"
                                        style={{ maxHeight: "45px" }}
                                        src={Logo}
                                        height={55} />
                                </Col>
                            </Row>
                            <Row className="mt-5 text-center">
                                <Col xs="12">
                                    <h4>Välkommen!</h4>
                                </Col>
                                <Col xs="12">
                                    <p>Börja med att logga in eller registrera dig</p>
                                </Col>
                            </Row>
                            <Row className="mt-4 justify-content-center">
                                <Col md="12">
                                    <Button className="p-2 w-100" variant="info" as={Link} to="/auth/signin">Logga in</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3 justify-content-center">
                                <Col md="12">
                                    <Button className="p-2 w-100" variant="info">Registrera mig</Button>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Authentication;