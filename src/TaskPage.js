import React, { Component } from 'react';
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

export class TaskPage extends Component {
    render() {
        return (
            <Container>
                <Row className="mt-3 justify-content-center">
                    <Col md="10">
                        <div>
                            <h1></h1>
                            <br></br>
                            <p></p>
                            <br> </br>

                            <p><strong style="text-align: center;"> </strong></p>
                            <ol>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                            <br></br>

                            <p><strong style="text-align: center;"> </strong></p>
                            <ol>
                                <li></li>
                                <li></li>
                            </ol>
                            <br> </br>

                            <p><strong style="text-align: center;"> </strong></p>
                            <p></p>
                        </div>
                    </Col>
                </Row>

            </Container>
        )
    }
    getHTML() {
        return { __html: s };
    }
}

export default TaskPage
