import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './MyNavBar';
import ListCard from './ListCard';
import { db } from '../FirebaseData';
import { CoupleDataConsumer } from '../CoupleDataContext';
import { UserConsumer } from '../UserContext';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chapters: []
        };
    }

    async getData() {
        const snap = await db.collection("chapters").doc("portals").get();
        const doc = snap.data();

        if (this.mounted) {
            this.setState({
                chapters: doc.list
            });
        }
    }

    handleCheck(user, coupleData, chapter) {
        const coupleDataRef = user && user.coupleDataRef;
        if (!coupleDataRef || !coupleData) return;

        const completed = !this.isChapterComplete(coupleData, chapter.id);

        const data = {
            [`completionStatus.${chapter.id}.completed`]: completed
        }

        chapter.taskIds.forEach((id) => {
            data[`completionStatus.${chapter.id}.tasks.${id}`] = completed;
        });

        coupleDataRef.update(data);
    }

    isChapterComplete(coupleData, chapId) {
        const completionStatus = coupleData && coupleData.completionStatus;

        if (completionStatus && completionStatus[chapId] && completionStatus[chapId].completed) {
            return completionStatus[chapId].completed;
        }

        return false;
    }

    componentDidMount() {
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <>
                <MyNavBar />
                <Container className="mt-3">
                    <Row>
                        {this.state.chapters.map((item, index) => {
                            return (
                                <UserConsumer>
                                    {user => (
                                        <CoupleDataConsumer>
                                            {coupleData => (
                                                <Col key={item.id} className="mb-2" xs="12" md="6">
                                                    <ListCard
                                                        subhead={item.subHead}
                                                        title={item.title}
                                                        enableCheck={coupleData ? true : false}
                                                        complete={this.isChapterComplete(coupleData, item.id)}
                                                        handleClick={() => this.props.history.push({ pathname: "/chapter", state: { chapter: item } })}
                                                        handleCheck={this.handleCheck.bind(this, user, coupleData, item)} />
                                                </Col>
                                            )}
                                        </CoupleDataConsumer>
                                    )}
                                </UserConsumer>
                            );
                        })}
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;
