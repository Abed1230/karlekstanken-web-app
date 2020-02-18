import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyStrings from '../MyStrings.js';

function NotFound() {
    return (
        <Container style={{ height: "100vh" }}>
            <Row className="h-100">
                <Col className="align-self-center text-center">
                    <h2>404</h2>
                    <h5>{MyStrings.NotFound.text}</h5>
                    <Button className="mt-4" as={Link} to="/" replace>{MyStrings.NotFound.btn}</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;