import React, { Component } from 'react'
import { fire } from './FirebaseData';
import { Form, Button, Container, Card } from "react-bootstrap";


export class Home extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {

        }

    }
    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>You are home</h1>
                    <Button type="button" onClick={this.logout}>Logga ut </Button>
                </Container>
            </div>
        )
    }
}

export default Home
