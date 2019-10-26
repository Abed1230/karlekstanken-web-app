import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { db } from './FirebaseData';
import MyNavBar from './components/MyNavBar';
import logo from './logo.png';
import logoAlt from './assets/logo_alt.png';
import time from './assets/time.svg';
import './TaskPage.css';

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

        return task ? (
            <>
                <MyNavBar goBack={true} />
                <Container>
                    {/* <Row className="mt-3">
                        <Col>
                            <small>{task.subHead}</small>
                            <h4>{task.title}</h4>
                            <Dropdown.Divider />
                        </Col>
                    </Row> */}
                    <Row className="mt-4">
                        <Col className="col-print-4" md="4">
                            <img
                                className="d-none d-print-block"
                                src={logo}
                                height="25"
                                alt="Logo"
                            />
                        </Col>
                        <Col className="col-print-4 d-flex justify-content-center" md="4">
                            <img
                                className="d-none d-print-block"
                                src={logoAlt}
                                height="55"
                                alt="Logo"
                            />
                        </Col>
                        <Col className="col-print-4 d-flex justify-content-end" md="4">
                            <div className="text-center">
                                <img
                                    src={time}
                                    height="50"
                                    alt="Time"
                                />
                                <br />
                                <span>40 MIN</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col md="10">
                            <div dangerouslySetInnerHTML={{ __html: task.bodyHTML }} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
            :
            (
                <>
                    <MyNavBar goBack={true} />
                    <Container className="mt-3">
                        {/* <Row className="mt-3">
                            <Col>
                                <small>{this.state.taskMin.subHead}</small>
                                <h4>{this.state.taskMin.title}</h4>
                                <Dropdown.Divider />
                            </Col>
                        </Row> */}
                        <Row className="mt-2">
                            <Col>
                                <p>Laddar in...</p>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
    }
}

export default TaskPage
