import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TransparentButton from '../TransparentButton';
import { CloseIcon } from '../../assets/svgs';

const InstallBanner = ({ handleClick, handleClose }) => (
    <div className="bg-info text-center text-white fixed-bottom pt-3 pb-3 pl-4 pr-4" style={{ zIndex: 1 }}>
        <Row className="d-flex align-items-center ">
            <Col>
                <h6>Lägg till Kärlekstanken på din hemskärm för snabb åtkomst</h6>

                {/* <Button size="sm" variant="outline-info" onClick={handleClick}>Se hur du gör</Button> */}
                {/* <TransparentButton onClick={handleClick} variant="outline-light">Tryck här</TransparentButton> */}
                <Button className="mt-1" variant="outline-light" size="sm" onClick={handleClick}>Lägg till</Button>
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
