import React from 'react';
import { Button, Card, Modal, Container, Row, Col } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';

const LoveLangCard = ({ name, lang, handleClick }) => {
    return (
        <Card className="mt-2 h-100">
            <Card.Body >
                <small className="text-muted">{name ? name + "'s kärleksspråk" : "Ditt kärleksspråk"}</small>
                <Card.Title>{lang}</Card.Title>
                <Button className="text-primary px-0 py-0" style={{ background: "none", border: "none" }} onClick={handleClick}>Visa beskrivning</Button>
            </Card.Body>
        </Card>
    );
}

/* TODO: move to a json document */
const loveLanguges = {
    "A": { name: "Presenter", description: "Ea ullamco non ea magna culpa pariatur et ipsum ex aliquip cillum quis ad. Veniam magna proident reprehenderit elit irure pariatur nostrud et minim amet reprehenderit minim anim officia. Exercitation amet enim anim eu. Aliquip nisi quis ea consectetur minim minim anim consequat adipisicing laborum quis." },
    "B": { name: "Paprika", description: "Elit veniam Lorem quis duis consequat est. Mollit culpa cupidatat culpa in laboris adipisicing minim. Culpa aute ullamco aute nulla eiusmod qui id tempor dolor fugiat. Velit minim elit est ex deserunt nulla laboris ipsum occaecat minim enim. Excepteur et sit id dolor anim qui. Aute magna fugiat pariatur ex officia consequat et ut laborum do minim amet velit. Cillum proident officia Lorem id." },
}

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalTitle: "",
            modalText: "",
        };
    }
    render() {
        return (
            <UserConsumer>
                {userVal => {
                    const user = userVal ? userVal : {};
                    const userLoveLang = user.loveLanguage;
                    /* TODO: get love lang from couple data */
                    const partnerLoveLang = user.partner && user.partner.loveLanguage;
                    return (
                        <Container>
                            <Row>
                                <Col>
                                    <h4 className="mt-4 mb-4 text-center">Du & {user.partner ? user.partner.name : "?"}</h4>

                                    {/* TODO: navigate to add partner page */}
                                    {!user.partner &&
                                        <div className="text-center"><Button variant="info">Lägg till partner</Button></div>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                {partnerLoveLang &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <LoveLangCard name={user.partner.name} lang={loveLanguges[partnerLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: loveLanguges[partnerLoveLang].name, modalText: loveLanguges[partnerLoveLang].description })} />
                                    </Col>
                                }

                                {userLoveLang &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <LoveLangCard lang={loveLanguges[userLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: loveLanguges[userLoveLang].name, modalText: loveLanguges[userLoveLang].description })} />
                                    </Col>
                                }

                                {/* TODO: navigate to test page */}
                                {!user.loveLanguage && user.premium &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <Card className="mt-2 h-100">
                                            <Card.Body>
                                                <small className="text-muted">Ditt kärleksspråk</small>
                                                <p>Du har ännu inte gjort språktestet</p>
                                                <Button variant="info">Gör testet nu</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            </Row>

                            <Modal size="lg" show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.modalTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.modalText}</Modal.Body>
                            </Modal>
                        </Container>
                    );
                }
                }
            </UserConsumer>
        );
    }
}

export default UserView;