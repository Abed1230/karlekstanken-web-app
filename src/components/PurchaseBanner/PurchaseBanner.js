import React from 'react';
import MyStrings from '../../MyStrings.js';
import {Row, Col, Alert} from 'react-bootstrap';

const PurchaseBanner = ({ handleClick }) => (
    <Row className="mb-4 justify-content-center">
        <Col xs="12" md="8" lg="8">
            <Alert
                variant="info"
                className="p-lg-4 text-center"
                onClick={handleClick}
                style={{ cursor: "pointer" }}>
                <h6>{MyStrings.PurchaseBanner.text}</h6>
                <h6 className="text-primary">{MyStrings.PurchaseBanner.btn}</h6>
            </Alert>
        </Col>
    </Row>
);

export default PurchaseBanner;