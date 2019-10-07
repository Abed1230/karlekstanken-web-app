import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container style={{ height: "100vh" }}>
            <Row className="h-100">
                <Col className="align-self-center text-center">
                    <h2>404</h2>
                    <h5>Sidan hittades inte</h5>
                    <Button className="mt-4" as={Link} to="/" replace>Ta mig till hemsidan</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;