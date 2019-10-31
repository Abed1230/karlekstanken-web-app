import React, { useContext } from 'react';
import MyNavBar from './MyNavBar';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import ListCard from './ListCard';
import { Redirect } from 'react-router-dom';
import { db } from '../FirebaseData';
import { CoupleDataConsumer } from '../CoupleDataContext';
import { UserConsumer } from '../UserContext';

const YoutubePlayer = ({ url }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={url} allowFullScreen></iframe>
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
        doc.id = snap.id;

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

        return chapter ? (
            <>
                <MyNavBar goBack={true} />
                <Container className="mt-3">
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
                                    <Col key={index} className="mt-3 mx-auto" xs="12" md="6">
                                        <YoutubePlayer url={item.url} />
                                    </Col>
                                );
                            })}
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col md="9">
                            <h5>{chapter.bodyTitle}</h5>
                            <p>{chapter.bodyText}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h6 className="text-secondary">ÖVNINGAR</h6>
                            <Dropdown.Divider />
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                        {chapter.tasks && chapter.tasks.map((item, index) => {
                            return (
                                <Col key={item.id} className="mb-2" xs="12" md="4">
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
                            <p>Laddar in...</p>
                        </Col>
                    </Row>
                </Container>
            </>);
    }

}

export default Chapter;