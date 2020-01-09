import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TransparentButton from '../TransparentButton';
import { CloseIcon } from '../../assets/svgs';

const InstallBanner = ({ handleClick, handleClose }) => (
    <div className="bg-dark text-center text-white fixed-bottom pt-3 pb-3 pl-4 pr-4">
        <Row className="d-flex align-items-center ">
            <Col>
                <h6>Lägg till Kärlekstanken på din hemskärm.</h6>
                <Button size="sm" variant="outline-info" onClick={handleClick}>Se hur du gör</Button>
            </Col>
            <Col className="" xs="2" lg="1">
                <TransparentButton onClick={handleClose}>
                    <CloseIcon width="16" height="16" color="#FFF" />
                </TransparentButton>
            </Col>
        </Row>
    </div>
);

export default InstallBanner;
