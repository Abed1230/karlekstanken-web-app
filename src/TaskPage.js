import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { db } from './FirebaseData';
import MyNavBar from './components/MyNavBar';
import time from './assets/time.svg';
import './TaskPage.css';
import PrintTask from './PrintTask';

export class TaskPage extends Component {
    constructor(props) {
        super(props);
        const { location } = props;
        const taskMin = location && location.state && location.state.task;
        const chapterId = location && location.state && location.state.chapterId;
        this.state = {
            taskMin: taskMin,
            chapterId: chapterId,
            shouldRender: taskMin ? true : false
        }
    }

    async getData() {
        const chapterId = this.state.chapterId;
        const id = this.state.taskMin.id;
        const snap = await db.collection("chapters").doc(chapterId).collection("tasks").doc(id).get();
        const doc = snap.data();

        if (this.mounted) {
            this.setState({
                task: doc
            });
        }
    }

    componentDidMount() {
        this.mounted = true;

        if (this.state.shouldRender) {
            this.getData();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (!this.state.shouldRender) {
            return <Redirect to="/" />
        }

        const task = this.state.task;

        return (
            <>
                <MyNavBar goBack={true} />
                {task ?
                    <>
                        <Container className="d-print-none">
                            <Row className="mt-4">
                                <Col className="text-right" /* className="d-flex justify-content-end" */>
                                    <div className="d-inline-block text-center">
                                        <img
                                            src={time}
                                            height="50"
                                            alt="Time"
                                        />
                                        <br />
                                        <span>{task.time}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-4 justify-content-center">
                                <Col md="9">
                                    <div dangerouslySetInnerHTML={{ __html: task.bodyHTML }} />
                                </Col>
                            </Row>
                        </Container>
                        <PrintTask task={task} />
                    </>
                    :
                    <Container className="mt-3">
                        <Row className="mt-2">
                            <Col>
                                <p>Laddar in...</p>
                            </Col>
                        </Row>
                    </Container>
                }

            </>
        )
    }
}

export default TaskPage
