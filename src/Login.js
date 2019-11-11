import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from './FirebaseData';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import loginImg from './assets/login_page.jpg';
import { Formik } from 'formik';
import *as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ogiltig Email adress')
        .required('Vänligen, skriv in ditt Email'),
    password: Yup.string()
        .min(6, 'Lösenordet måste bestå av minst 6 tecken')
        .required('Vänligen, skriv in ditt lösenord'),
});

export class Login extends Component {
    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
    }

    login(values) {
        fire.auth().signInWithEmailAndPassword(values.email, values.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${loginImg})`, backgroundSize: ('cover'), backgroundAttachment: ('fixed') }}>
                <Container style={{ marginTop: 20, height: 800 }}>
                    <Row className="justify-content-center">
                        <Card style={{ width: 300, marginTop: 40, borderRadius: 10, opacity: 0.90, padding: 40 }}>
                            <div className="text-center" style={{ padding: 5, position: ('absolute'), borderRadius: 5, margin: -40, opacity: 0.90, width: ('100%'), backgroundColor: ('blue') }}>
                                <h4 style={{ color: ('white') }} className="text-center">Logga in</h4>
                            </div>
                            <div style={{ padding: 20 }}></div>
                            <Row className="justify-content-center">
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={LoginSchema}
                                    onSubmit={this.login}
                                >
                                    {({ handleSubmit, handleChange, values, errors }) =>
                                        (<Form noValidate={true} onSubmit={handleSubmit}>
                                            <Form.Group controlId="emailForm">
                                                <Form.Control type="email" name="email" placeholder="Email" value={values.email} isInvalid={!!errors.email} onChange={handleChange} />
                                                <Form.Text className="text-muted">
                                                    Email
                                                </Form.Text>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="passwordForm">
                                                <Form.Control required type="password" name="password" placeholder="Lösenord" value={values.password} isInvalid={!!errors.password} onChange={handleChange} />
                                                <Form.Text className="text-muted">
                                                    Lösenord
                                        </Form.Text>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Row className="justify-content-center">
                                                <Col className="text-center">
                                                    <Button style={{ width: 200 }} type="submit">Logga in</Button>
                                                </Col>
                                            </Row>
                                        </Form>)
                                    }
                                </Formik>
                            </Row>

                            <Row className="justify-content-center">
                                <small style={{ marginBottom: 10 }}><Link className="text-center" to='signup'>Inget konto? Registrera dig här</Link></small>
                            </Row>
                        </Card>
                    </Row>

                </Container >
            </div>

        )
    }
}

export default Login