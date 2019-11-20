import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import './Authentication.css';
import Logo from '../../logo.png';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="24" height="24" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
);

function SignIn({ history }) {
    return (
        <>
            <div className="bg vh-100"></div>
            <Container className="content">
                <Row className="justify-content-center mt-5 mb-5">
                    <Col md="8" lg="5" >
                        <div className="my-card pt-4 pb-5 pl-3 pr-3 ">
                            <Row>
                                <Col>
                                    <Button className="py-1 px-2" style={{ background: "none", border: "none" }} onClick={() => history.goBack()}>
                                        <BackIcon />
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
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
                                    <h4>Inloggning</h4>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md="11">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>E-postadress</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Skriv in din e-postadress" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Lösenord</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Skriv in din lösenord" />
                                        </Form.Group>
                                        <Button className="p-2 w-100" variant="info">Logga in</Button>
                                    </Form>
                                    <Button
                                        className="mt-3 text-primary px-0 py-0"
                                        style={{ background: "none", border: "none" }}
                                    >
                                        Glömt lösenord?
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SignIn;