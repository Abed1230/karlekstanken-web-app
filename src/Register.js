import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire, db } from './FirebaseData.js';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import loginImg from './assets/login_page.jpg';


export class Register extends Component {
    constructor(props) {
        super(props)


        this.handleInputchange = this.handleInputchange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleInputchange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.addUserToDocument(u.user.uid);
        }).catch((error) => {
            console.log(error);
        });
    }

    addUserToDocument(uid) {
        // Add a new document in collection "users"
        db.collection("users").doc(uid).set({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
    }

    render() {
        const { email } = this.state
        const { password } = this.state
        const { firstName } = this.state
        const { lastName } = this.state

        return (
            <div style={{ backgroundImage: `url(${loginImg})`, backgroundSize: ('cover'), backgroundAttachment: ('fixed') }}>
                <Container style={{ marginTop: 20, height: 800 }}>
                    <Row className="justify-content-center">
                        <Card style={{width: 500, marginTop: 40, borderRadius: 10, opacity: 0.90, padding: 40 }}>
                            <div style={{padding: 5, position:('absolute'),borderRadius:5, margin:-40, opacity:0.90, width: ('100%'), backgroundColor: ('blue')}}>
                            <h4 style={{color:('white')}} className="text-center">Registrera</h4>
                            </div>
                            <div style={{padding:10}}></div>
                            <Row className="justify-content-center">
                                <Col>
                                    <Form onChange={this.handleInputchange}>
                                        <Form.Group controlId="firstNameForm">
                                            <Form.Label className="text-muted">
                                                Förnamn
                                            </Form.Label>
                                            <Form.Control required type="text" name="firstName" placeholder="Förnamn" />
                                        </Form.Group>
                                    </Form>

                                    <Form onChange={this.handleInputchange}>
                                        <Form.Group controlId="emailForm">
                                            <Form.Label className="text-muted">
                                                Email
                                            </Form.Label>
                                            <Form.Control required type="email" name="email" placeholder="Email" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col>
                                    <Form onChange={this.handleInputchange}>
                                        <Form.Group controlId="lastNameForm">
                                            <Form.Label className="text-muted">
                                                Efternamn
                                            </Form.Label>
                                            <Form.Control required type="text" name="lastName" placeholder="Efternamn" />
                                        </Form.Group>
                                    </Form>

                                    <Row className="justify-content-center">
                                        <Form onChange={this.handleInputchange}>
                                            <Form.Group controlId="passwordForm">
                                                <Form.Label className="text-muted">
                                                    Lösenord
                                                </Form.Label>
                                                <Form.Control required type="password" name="password"/>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <small style={{ marginBottom: 10 }}><Link className="text-center" to='signin'>Logga in? Klicka här</Link></small>
                            </Row>

                            <Row className="justify-content-center">
                                <Col className="text-center">
                                    <Button style={{ width: 200 }} onClick={this.signup}>Registrera</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Row>

                </Container >
            </div>
        )
    }
}

export default Register