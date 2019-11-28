import React from 'react';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import './Authentication.css';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';

function Select() {
    return (
        <>
            <Row className="mt-3 text-center">
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
                    <Button className="p-2 w-100" variant="info" as={Link} to="/auth/signup">Registrera mig</Button>
                </Col>

            </Row>
        </>
    );
}

function Authentication({ match }) {
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
                                        alt="Kärlekstanken"/>
                                    <hr />
                                </Col>
                            </Row>
                            <BrowserRouter>
                                <Switch>
                                    <Route path={`${match.path}/`} component={Select} exact />
                                    <Route path={`${match.path}/signin`} component={Login} exact />
                                    <Route path={`${match.path}/reset`} component={ForgotPassword} exact />
                                    <Route path={`${match.path}/signup`} component={Register} exact />
                                    <Route render={() => (<Redirect to="/auth" />)} />
                                </Switch>
                            </BrowserRouter>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Authentication;