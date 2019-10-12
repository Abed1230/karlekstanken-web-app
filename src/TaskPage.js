import React, { Component } from 'react';
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { db, auth } from './FirebaseData';

export class TaskPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: null
        }
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const task = this.state.task;
        if (task) {
            return (
                <Container>
                    <Row className="mt-3 justify-content-center">
                        <Col md="10">
                            <div>
                                <h1 className="text-center">{task.title}</h1>
                                <p>{task.introText}</p>
                                <br />

                                <p className="text-center"><strong>{task.bold1} </strong></p>

                                <ol>
                                    {task.questions.map((question, i) => {
                                        return <li className="mb-2" key={i}>{question}</li>
                                    })}
                                </ol>
                                <br />

                                <p className="text-center"><strong>{task.bold2} </strong></p>
                                <ol>
                                    {task.questions.map((discuss, i) => {
                                        return <li className="mb-2" key={i}>{discuss}</li>
                                    })}
                                </ol>
                                <br />

                                <p className="text-center"><strong>TIPS!</strong></p>
                                <p></p>
                            </div>
                        </Col>
                    </Row>

                </Container>
            )
        }
        return <div><h1>Loading</h1></div>
    }
    async getData() {
        const snap = await db.collection("free_chapters").doc("iRP8oCwF0CpjJeI2yejf").collection("tasks").doc("7Ekffm8PytaAIxLjBncN").get();
        this.setState({ task: snap.data() });
    }
}

export default TaskPage
