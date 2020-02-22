import React from 'react';
import MyNavBar from './MyNavBar';
import { Container, Row, Col, Dropdown, Collapse, Button } from 'react-bootstrap';
import ListCard from './ListCard';
import { Redirect } from 'react-router-dom';
import { db } from '../FirebaseData';
import { CoupleDataConsumer } from '../CoupleDataContext';
import { UserConsumer } from '../UserContext';
import MyStrings from '../MyStrings.js';
import TransparentButton from './TransparentButton';
import trimText from '../../node_modules/read-more-react/dist/utils/trimText.js';

const YoutubePlayer = ({ url, title }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" title={title} src={url} allowFullScreen></iframe>
        </div>
    );
}

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        const { location } = props;
        const chapterMin = location && location.state && location.state.chapter;
        this.state = {
            chapterMin: chapterMin,
            shouldRender: chapterMin ? true : false,
            open: false,
            /* chapter: {
                title: "Inspirerande introduktion",
                subTitle: "Del 1",
                bodyTitle: "Hello World",
                bodyText: "Occaecat aute et sint incididunt. Veniam est ea ut non mollit qui aliquip reprehenderit magna commodo. Tempor ea aliquip eu enim. Officia id id ea irure ea id nulla aute eu incididunt est cillum Lorem voluptate. Velit labore eu id esse duis magna nulla est reprehenderit nulla. Laborum eu velit deserunt deserunt est. Irure commodo do aliquip laborum amet consequat eu incididunt amet.",
                videos: [{ url: "https://www.youtube.com/embed/hVvEISFw9w0" }, { url: "https://player.vimeo.com/video/356935968" }]
            }, */
        };

        //this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(user, coupleData, chapter, taskId, complete) {
        const coupleDataRef = user && user.coupleDataRef;
        if (!coupleDataRef || !coupleData) return;

        const isTaskCompleted = !complete;

        const taskIds = [];
        chapter.tasks.forEach((task) => {
            if (task.id !== taskId) {
                taskIds.push(task.id);
            }
        });

        const isChapterCompleted = isTaskCompleted && this.isAllTasksCompleted(taskIds, chapter.id, coupleData);

        // write to db
        coupleDataRef.update({
            [`completionStatus.${chapter.id}.completed`]: isChapterCompleted,
            [`completionStatus.${chapter.id}.tasks.${taskId}`]: isTaskCompleted
        });
    }

    async getData() {
        const id = this.state.chapterMin.id;
        const snap = await db.collection("chapters").doc(id).get();
        const doc = snap.data();

        if (!doc) return;

        doc.id = snap.id;
        doc.tasks && doc.tasks.sort((a, b) => a.subHead.localeCompare(b.subHead, undefined, { numeric: true, sensitivity: 'base' }));

        if (this.mounted) {
            this.setState({
                chapter: doc
            });
        }
    }

    isTaskComplete(coupleData, chapId, taskId) {
        const completionStatus = coupleData && coupleData.completionStatus;

        if (completionStatus && completionStatus[chapId] && completionStatus[chapId].tasks &&
            completionStatus[chapId].tasks[taskId]) {
            return completionStatus[chapId].tasks[taskId];
        }

        return false;
    }

    isAllTasksCompleted(taskIds, chapterId, coupleData) {
        const completionStatus = coupleData.completionStatus;
        if (completionStatus && completionStatus[chapterId] &&
            completionStatus[chapterId].tasks) {
            let count = 0;
            taskIds.forEach((id) => {
                if (completionStatus[chapterId].tasks[id])
                    count++;
            });
            return count === taskIds.length;
        }

        return false;
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

        const chapter = this.state.chapter;

        let bodyTextArray;
        if (chapter)
            bodyTextArray = trimText(chapter.bodyText, 180, 250, 330);

        return chapter ? (
            <>
                <MyNavBar goBack={true} />
                <Container className="mt-3 mb-3">
                    <Row className="mt-3">
                        <Col>
                            <small>{chapter.subHead}</small>
                            <h4>{chapter.title}</h4>
                            <Dropdown.Divider />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {chapter.videos &&
                            chapter.videos.map((item, index) => {
                                return (
                                    <Col key={index} className="mt-3 mx-auto" xs="12" md="9" lg="6">
                                        <h6>{item.title}</h6>
                                        <YoutubePlayer url={item.url} title={item.title} />
                                    </Col>
                                );
                            })}
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col lg="9">
                            <h5>{chapter.bodyTitle}</h5>
                            <p>
                                {bodyTextArray && bodyTextArray[0].split('\n').map((text, index) => (
                                    <React.Fragment key={`${text}-${index}`}>
                                        {index > 0 && <br />}
                                        {text}
                                    </React.Fragment>
                                ))}
                                {" "}
                                {this.state.open &&
                                    bodyTextArray && bodyTextArray[1].split('\n').map((text, index, arr) => (
                                        <React.Fragment key={`${text}-${index}`}>
                                            {text}
                                            {!(arr.length - 1 === index) && <br />}
                                        </React.Fragment>
                                    ))
                                }
                                {" "}
                                {bodyTextArray && bodyTextArray[1] &&
                                    <TransparentButton className="text-info" variant="light" onClick={() => this.setState({ open: !this.state.open })}>
                                        {this.state.open ? MyStrings.readLessBtn : MyStrings.readMoreBtn}
                                    </TransparentButton>
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h6 className="text-secondary">{MyStrings.exercises}</h6>
                            <Dropdown.Divider />
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                        {chapter.tasks && chapter.tasks.map((item, index) => {
                            return (
                                <Col key={item.id} className="mb-2" xs="12" md="6" lg="4">
                                    <UserConsumer>
                                        {user => (
                                            <CoupleDataConsumer>
                                                {coupleData => (
                                                    <ListCard
                                                        subhead={item.subHead}
                                                        title={item.title}
                                                        enableCheck={coupleData ? true : false}
                                                        complete={this.isTaskComplete(coupleData, chapter.id, item.id)}
                                                        handleClick={() => this.props.history.push({ pathname: "/task", state: { task: item, chapterId: chapter.id } })}
                                                        handleCheck={this.handleCheck.bind(this, user, coupleData, chapter, item.id, this.isTaskComplete(coupleData, chapter.id, item.id))} />
                                                )}
                                            </CoupleDataConsumer>
                                        )}
                                    </UserConsumer>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </>
        )
            :
            (<>
                <MyNavBar goBack={true} />
                <Container className="mt-3">
                    <Row className="mt-3">
                        <Col>
                            <small>{this.state.chapterMin.subHead}</small>
                            <h4>{this.state.chapterMin.title}</h4>
                            <Dropdown.Divider />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <p>{MyStrings.loading}</p>
                        </Col>
                    </Row>
                </Container>
            </>);
    }

}

export default Chapter;