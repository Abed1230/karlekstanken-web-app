import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logoAlt from '../assets/logo_alt.png';
import { Link } from 'react-router-dom';
import MyStrings from '../MyStrings.js';
import { analytics } from '../FirebaseData';

class PurchaseSuccess extends React.Component {
    componentDidMount() {
        analytics.logEvent('purchase', {
            items: [{ name: "Kärlekstanken Licens" }]
        });
    }

    render() {
        return (
            <Container>
                <Row className="mt-5 justify-content-center">
                    <Col className="d-flex justify-content-center" md="4">
                        <img
                            src={logoAlt}
                            height="75"
                            alt="Logo"
                        />
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col className="text-center" md="6">
                        <h3>{MyStrings.PurchaseSuccess.header}</h3>
                        <p className="mt-3 lead">{MyStrings.PurchaseSuccess.lead}</p>
                        <p>{MyStrings.PurchaseSuccess.text}</p>
                        <small>{MyStrings.PurchaseSuccess.notice}</small>
                        <br />
                        <Button className="mt-3 mb-3" variant="info" as={Link} to="/">{MyStrings.PurchaseSuccess.btn}</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PurchaseSuccess;