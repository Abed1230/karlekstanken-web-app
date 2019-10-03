import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
);

function ListCard({ subhead, title, complete, handleClick, handleCheck }) {
    return (
        <Card className="mb-2 h-100" tabIndex="0" style={{ cursor: "pointer" }}>
            <Card.Body>
                <Row>
                    <Col xs="10" onClick={handleClick}>
                        <small className="text-muted">{subhead}</small>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                    <Col className="d-flex justify-content-center" xs="2">
                        <div className="align-self-center" onClick={handleCheck}><CheckIcon fill={complete ? "#4CAF50" : "grey"} /></div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ListCard;