import React from 'react';
import LoveLanguages from '../LoveLanguages.json';
import { Button, Card, Modal, Container, Row, Col } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';
import { Link } from 'react-router-dom';
import { ReceivedPartnerRequest, SentPartnerRequest } from './PartnerRequest.js';
import AddPartnerModal from './AddPartnerModal.js';

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

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPartnerModal: false,
            showModal: false,
            modalTitle: "",
            modalText: "",
        };
    }

    openAddPartnerModal() {
        //this.setState({showAddPartnerModal: true});
        if (this.addPartnerBtn) {
            this.addPartnerBtn.click();
        }
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

                                    {!user.partner && !user.partnerRequestFrom && !user.partnerRequestTo &&
                                        <div className="text-center"><Button variant="info" ref={el => this.addPartnerBtn = el} onClick={() => this.setState({ showAddPartnerModal: true })} >Lägg till partner</Button></div>
                                    }
                                </Col>
                            </Row>

                            {user.partnerRequestFrom &&
                                <Row className="justify-content-md-center">
                                    <Col md="6">
                                        <ReceivedPartnerRequest name={user.partnerRequestFrom.name} email={user.partnerRequestFrom.email} />
                                    </Col>
                                </Row>
                            }

                            {user.partnerRequestTo &&
                                <Row className="justify-content-md-center">
                                    <Col md="6">
                                        <SentPartnerRequest name={user.partnerRequestTo.name} email={user.partnerRequestTo.email} />
                                    </Col>
                                </Row>
                            }

                            <Row>
                                {partnerLoveLang &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <LoveLangCard name={user.partner.name} lang={LoveLanguages[partnerLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: LoveLanguages[partnerLoveLang].name, modalText: LoveLanguages[partnerLoveLang].description })} />
                                    </Col>
                                }

                                {userLoveLang &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <LoveLangCard lang={LoveLanguages[userLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: LoveLanguages[userLoveLang].name, modalText: LoveLanguages[userLoveLang].description })} />
                                    </Col>
                                }

                                {!user.loveLanguage && user.premium &&
                                    <Col className="mb-2" xs="12" md="6">
                                        <Card className="mt-2 h-100">
                                            <Card.Body>
                                                <small className="text-muted">Ditt kärleksspråk</small>
                                                <p>Du har ännu inte gjort språktestet</p>
                                                <Button variant="info" as={Link} to="/languagetest">Gör testet nu</Button>
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

                            <AddPartnerModal show={this.state.showAddPartnerModal} user={user} handleHide={() => this.setState({ showAddPartnerModal: false })} />
                        </Container>
                    );
                }
                }
            </UserConsumer>
        );
    }
}

export default UserView;