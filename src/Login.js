import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from './FirebaseData';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import loginImg from './assets/login_page.jpg';

export class Login extends Component {
    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
        this.handleInputchange = this.handleInputchange.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }


    handleInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login(e) {
        console.log(this.state.email);
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${loginImg})`,backgroundSize: ('cover'), backgroundAttachment:('fixed')}}>
                <Container style={{ marginTop: 20, height: 800 }}>
                    <Row className="justify-content-center">
                    <Card style={{ width: 300, marginTop:40, borderRadius: 10, opacity:0.90, padding:40 }}>
                        <h2 className="text-center">Logga in</h2>
                        <Row className="justify-content-center">
                            <Form onChange={this.handleInputchange}>
                                <Form.Group controlId="emailForm">
                                    <Form.Control required type="email" name="email" placeholder="Email" />
                                    <Form.Text className="text-muted">
                                        Email
                                </Form.Text>
                                </Form.Group>
                            </Form>
                        </Row>

                        <Row className="justify-content-center">
                            <Form onChange={this.handleInputchange}>
                                <Form.Group controlId="passwordForm">
                                    <Form.Control required type="password" name="password" placeholder="Lösenord" />
                                    <Form.Text className="text-muted">
                                        Lösenord
                                </Form.Text>
                                </Form.Group>
                            </Form>
                        </Row>

                        <Row className="justify-content-center">
                            <small style={{ marginBottom: 10 }}><Link className="text-center" to='signup'>Inget konto? Registrera dig här</Link></small>
                        </Row>

                        <Row className="justify-content-center">
                            <Col className="text-center">
                                <Button style={{ width: 200 }} onClick={this.login}>Logga in</Button>
                            </Col>
                        </Row>
                    </Card>
                    </Row>
                    
                </Container >
            </div>

        )
    }
}

export default Login