import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { db } from '../../FirebaseData';
import MyNavBar from '../MyNavBar';
import time from '../../assets/time.svg';
import './TaskPage.css';
import PrintTask from './PrintTask';
import MyStrings from '../../MyStrings.js';

const PrintIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" /><circle cx="18" cy="11.5" r="1" /></svg>
);

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

    handlePrint() {
        try {
            document.execCommand('print', false, null);
        }
        catch (e) {
            window.print();
        }
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
                                <Col>
                                    <button onClick={() => this.handlePrint()}
                                        style={{ cursor: "pointer", backgroundColor: "transparent", border: "0px" }}>
                                        <span className="mr-1"><PrintIcon fill="#000" /></span>
                                        {MyStrings.print}
                                    </button>
                                </Col>
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
                            <Row className="mb-4 justify-content-center">
                                <Col lg="9">
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
                                <p>{MyStrings.loading}</p>
                            </Col>
                        </Row>
                    </Container>
                }

            </>
        )
    }
}

export default TaskPage
