import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './MyNavBar';
import ListCard from './ListCard';
import { CoupleDataConsumer } from '../CoupleDataContext';
import { UserConsumer } from '../UserContext';
import './Home.css';
import PurchaseModal from './PurchaseModal';
import { ChaptersConsumer } from '../contexts/ChaptersContext';

const HeartProgressBar = ({ value }) => {
    value = (value < 0) ? 0 : (value > 1) ? 1 : value;
    const textValue = Math.trunc(value * 100);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="progress" x1="0" y1="1" x2="0" y2="0">
                    <stop id="stop1" offset={value} stopColor="#e53935" />
                    <stop id="stop2" offset={value} stopColor="#e53935" stopOpacity="0.6" />
                </linearGradient>
            </defs>
            <g>
                <path fill="url(#progress)" d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                <text x="12" y="12" textAnchor="middle" alignmentBaseline="central" fontWeight="bold" fill="#B71C1C" fontSize="5">{textValue}%</text>
            </g>
        </svg>
    );
};

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            showPurchaseModal: false,
        };

        this.handleCheck = this.handleCheck.bind(this);
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

    calculateProgressValue(chapters, coupleData) {
        // get total number of tasks
        const taskIds = [];
        let numTasks = 0;
        chapters.forEach((chap) => {
            if (chap.taskIds) {
                numTasks += chap.taskIds.length;
                taskIds.push.apply(taskIds, chap.taskIds);
            }
        });

        // get number of completed tasks
        let numCompletedTasks = 0;
        const completionStatus = coupleData.completionStatus;
        if (completionStatus) {
            Object.keys(completionStatus).forEach((key) => {
                const tasks = completionStatus[key].tasks;
                console.log(completionStatus[key]);

                if (tasks) {
                    for (const [id, completed] of Object.entries(tasks)) {
                        // Ignores completed tasks that have been deleted
                        if (completed && taskIds.includes(id)) {
                            numCompletedTasks++;
                        }
                    }
                }
            });
        }

        if (numCompletedTasks === 0 && numTasks === 0 || numCompletedTasks === 1 && numTasks === 0) {
            return 0;
        }

        console.log(numCompletedTasks / numTasks);
        return (numCompletedTasks / numTasks);
    }

    handleClick(chapter, user) {
        console.log(chapter);
        const premiumUser = user && user.premium;
        if (chapter.premium && !premiumUser) {
            this.setState({ showPurchaseModal: true });
            return;
        }

        this.props.history.push({ pathname: "/chapter", state: { chapter: chapter } })
    }

    componentDidMount() {
        this.mounted = true;

        const visited = localStorage.getItem("alreadyVisited");
        if (!visited) {
            localStorage.setItem("alreadyVisited", true);
            this.myNavBar.toggleMenu();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <>
                <MyNavBar onRef={ref => (this.myNavBar = ref)} />
                <ChaptersConsumer>
                    {chapters => (
                        <UserConsumer>
                            {user => {
                                return (
                                    <CoupleDataConsumer>
                                        {coupleData => {
                                            const showUnlockMsg = user && !user.premium;
                                            return (
                                                <>
                                                    <div className="sticky-top mt-3 text-center" style={{ top: "78px", zIndex: "1" }}>
                                                        <HeartProgressBar value={chapters && coupleData ? this.calculateProgressValue(chapters, coupleData) : 0} />
                                                    </div>
                                                    <Container id="container" className="mt-3" style={showUnlockMsg ? { paddingBottom: "120px" } : { paddingBottom: "15px" }}>
                                                        <Row>
                                                            {user && chapters ?
                                                                chapters.map((item, index) => {
                                                                    const premiumUser = user && user.premium;
                                                                    const enableCheck = item.premium ? coupleData && premiumUser : Boolean(coupleData);
                                                                    return (
                                                                        <Col key={item.id} className="mb-2" xs="12" md="6" lg="4">
                                                                            <ListCard
                                                                                subhead={item.subHead}
                                                                                title={item.title}
                                                                                disabled={item.premium && !premiumUser}
                                                                                enableCheck={enableCheck}
                                                                                complete={this.isChapterComplete(coupleData, item.id)}
                                                                                handleClick={() => this.handleClick(item, user)}
                                                                                handleCheck={() => this.handleCheck(user, coupleData, item)} />
                                                                        </Col>
                                                                    );
                                                                })
                                                                :
                                                                [...Array(10)].map((item, index) => (
                                                                    <Col key={index} className="mb-2" xs="12" md="6" lg="4">
                                                                        <div style={{ height: "110px", backgroundColor: "#fafafa" }}>

                                                                        </div>
                                                                    </Col>
                                                                ))
                                                            }
                                                        </Row>
                                                    </Container>
                                                    {showUnlockMsg &&
                                                        <div id="unlock-msg" className="fixed-bottom bg-light d-flex align-items-center">
                                                            <div className="text-center mx-auto">
                                                                <p className="text-muted">Köp licens och få tillgång till hela kärlekstanken</p>
                                                                <Button size="sm" variant="outline-info" onClick={() => this.setState({ showPurchaseModal: true })}>Till köp</Button>
                                                            </div>
                                                        </div>
                                                    }
                                                    <PurchaseModal
                                                        show={this.state.showPurchaseModal}
                                                        handleHide={(shouldOpenAddPartnerModal) => {
                                                            this.setState({ showPurchaseModal: false });
                                                            if (shouldOpenAddPartnerModal)
                                                                this.myNavBar.openAddPartnerModal();
                                                        }} />
                                                </>
                                            )
                                        }}
                                    </CoupleDataConsumer>
                                )
                            }}
                        </UserConsumer>
                    )}
                </ChaptersConsumer>
            </>
        );
    }
}

export default Home;