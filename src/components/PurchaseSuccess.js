import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logoAlt from '../assets/logo_alt.png';
import { Link } from 'react-router-dom';

function PurchaseSuccess() {
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
                    <h3>Ditt köp lyckades!</h3>
                    <p className="mt-3 lead">Ni har nu licens och tillgång till hela kärlekstanken.</p>
                    <p>Varsågod och fortsätt där ni slutade och göra nästa kärleksövning för att lyfta er relation till 2.0</p>
                    <small>Notera: Ni kan komma att behöva ladda om sidan eller logga in på nytt för att alla avsnitt ska bli upplåsta för första gången.</small>
                    <br />
                    <Button className="mt-3 mb-3" variant="info" as={Link} to="/">Till alla avsnitt</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PurchaseSuccess;