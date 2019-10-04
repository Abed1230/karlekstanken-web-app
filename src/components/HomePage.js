import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './MyNavBar';
import ListCard from './ListCard';
import { db } from '../FirebaseData';
import {navigate} from '@reach/router';

/* var chapters = [{ id: "0", subhead: "Avsnitt 1", title: "Kommunikationens ädla konst", complete: false },
{ id: "1", subhead: "Avsnitt 2", title: "The Witcher", complete: true },
{ id: "3", subhead: "Avsnitt 3", title: "Minions", complete: true },];
 */
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chapters: []
        };
    }

    async getData() {
        console.log("get data called");
        /* TODO: get paid chapters if user is paid */
        const query = await db.collection("free_chapters").orderBy("position").get();
        const docs = query.docs;
        const chaps = docs.map((doc) => {
            const chap = doc.data();
            chap.id = doc.id;
            return chap;
        });

        if (this.mounted) {
            this.setState({
                chapters: chaps
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
                                /* TODO: navigate to chapter page */
                                <Col key={item.id} className="mb-2" xs="12" md="6">
                                    <ListCard
                                        subhead={item.subHead}
                                        title={item.title}
                                        complete={item.complete}
                                        handleClick={() => navigate("hello")}
                                        handleCheck={() => console.log(item.title + " checked!")} />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;
