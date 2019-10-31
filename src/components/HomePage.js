import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './MyNavBar';
import ListCard from './ListCard';
import { db } from '../FirebaseData';
import { CoupleDataConsumer } from '../CoupleDataContext';

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
                                <CoupleDataConsumer>
                                    {coupleData => (
                                        <Col key={item.id} className="mb-2" xs="12" md="6">
                                            <ListCard
                                                subhead={item.subHead}
                                                title={item.title}
                                                enableCheck={coupleData ? true : false}
                                                complete={item.complete}
                                                handleClick={() => this.props.history.push({ pathname: "/chapter", state: { chapter: item } })}
                                                handleCheck={() => console.log(item.title + " checked!")} />
                                        </Col>
                                    )}
                                </CoupleDataConsumer>
                            );
                        })}
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;
