import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavBar from './MyNavBar';
import ListCard from './ListCard';

var chapters = [{ id: "0", subhead: "Avsnitt 1", title: "Kommunikationens ädla konst", complete: false },
{ id: "1", subhead: "Avsnitt 2", title: "The Witcher", complete: true },
{ id: "3", subhead: "Avsnitt 3", title: "Minions", complete: true },];

function Home() {
    return (
        <>
            <MyNavBar />
            <Container className="mt-3">
                <Row>
                    {chapters.map((item, index) => {
                        return (
                            /* TODO: navigate to chapter page */
                            <Col key={item.id} className="mb-2" xs="12" md="6">
                                <ListCard
                                    subhead={item.subhead}
                                    title={item.title}
                                    complete={item.complete}
                                    handleCheck={() => console.log(item.title + " checked!")} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Home;
