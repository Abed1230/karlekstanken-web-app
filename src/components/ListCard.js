import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
);

function ListCard({ subhead, title, disabled, enableCheck, complete, handleClick, handleCheck }) {
    return (
        <button className="h-100 w-100" tabIndex="0" style={{ textAlign: "left", padding: "0px", background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}>
            <Card bg={disabled ? "light" : undefined} className="mb-2 h-100">
                <Card.Body>
                    <Row>
                        <Col xs="10">
                            <small className="text-muted">{subhead}</small>
                            <Card.Title>{title}</Card.Title>
                        </Col>
                        {enableCheck &&
                            <Col className="d-flex justify-content-center" xs="2" onClick={(e) => { e.stopPropagation(); handleCheck(); }}>
                                <div className="align-self-center"><CheckIcon fill={complete ? "#4CAF50" : "grey"} /></div>
                            </Col>
                        }
                    </Row>
                </Card.Body>
            </Card>
        </button>
    );
    /* return (
        <Card bg={disabled ? "light" : undefined} className="mb-2 h-100" tabIndex="0" style={{ cursor: "pointer" }} onClick={handleClick}>
            <Card.Body>
                <Row>
                    <Col xs="10">
                        <small className="text-muted">{subhead}</small>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                    {enableCheck &&
                        <Col className="d-flex justify-content-center" xs="2" onClick={(e) => { e.stopPropagation(); handleCheck(); }}>
                            <div className="align-self-center"><CheckIcon fill={complete ? "#4CAF50" : "grey"} /></div>
                        </Col>
                    }
                </Row>
            </Card.Body>
        </Card>
    ); */
}

export default ListCard;