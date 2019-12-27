import React from 'react';
import LoveLanguages from '../LoveLanguages.json';
import { Button, Card, Modal, Container, Row, Col } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';
import { CoupleDataConsumer } from '../CoupleDataContext';
import { Link } from 'react-router-dom';
import { ReceivedPartnerRequest, SentPartnerRequest } from './PartnerRequest.js';
import AddPartnerModal from './AddPartnerModal.js';
import RoundedCard from './RoundedCard';

const LoveLangCard = ({ name, lang, handleClick }) => {
    return (
        <RoundedCard>
            <Card.Body >
                <small className="text-muted">{name ? name + "'s kärleksspråk" : "Ditt kärleksspråk"}</small>
                <Card.Title>{lang}</Card.Title>
                <Button className="text-primary p-1" style={{ background: "none", border: "none", fontSize: "0.95rem" }} onClick={handleClick}>Visa beskrivning</Button>
            </Card.Body>
        </RoundedCard>
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
        if (this.addPartnerBtn) {
            this.addPartnerBtn.click();
        }
    }

    render() {
        return (
            <UserConsumer>
                {userVal => (
                    <CoupleDataConsumer>
                        {coupleData => {
                            const user = userVal ? userVal : {};
                            const partner = user.partner;
                            const userLoveLang = user.loveLanguage;
                            const partnerLoveLang = partner && coupleData && coupleData.loveLanguages
                                && coupleData.loveLanguages[partner.uid];
                            return (
                                <Container>
                                    <Row className="mt-4 mb-4 pb-3 pt-3" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                                        <Col>
                                            <h4 className="text-center text-white" style={{ fontSize: "2rem", fontFamily: "Lobster, Cursive", textShadow: "0px 3px 6px rgba(0,0,0,0.2)" }}>Du & {partner ? partner.name : "?"}</h4>

                                            {!partner && !user.partnerRequestFrom && !user.partnerRequestTo &&
                                                <div className="text-center mt-3"><Button block variant="info" ref={el => this.addPartnerBtn = el} onClick={() => this.setState({ showAddPartnerModal: true })} >LÄGG TILL PARTNER</Button></div>
                                            }
                                        </Col>
                                    </Row>

                                    {user.partnerRequestFrom &&
                                        <Row className="mb-2">
                                            <Col className="p-0">
                                                <ReceivedPartnerRequest name={user.partnerRequestFrom.name} email={user.partnerRequestFrom.email} />
                                            </Col>
                                        </Row>
                                    }

                                    {user.partnerRequestTo &&
                                        <Row className="mb-2">
                                            <Col className="p-0">
                                                <SentPartnerRequest name={user.partnerRequestTo.name} email={user.partnerRequestTo.email} />
                                            </Col>
                                        </Row>
                                    }

                                    <Row className="mb-2">
                                        <Col className="p-0">
                                            {userLoveLang && user.premium ?
                                                <LoveLangCard lang={LoveLanguages[userLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: LoveLanguages[userLoveLang].name, modalText: LoveLanguages[userLoveLang].description })} />
                                                :
                                                !user.loveLanguage && user.premium ?
                                                    <RoundedCard>
                                                        <Card.Body>
                                                            <small className="text-muted">Ditt kärleksspråk</small>
                                                            <p>Du har ännu inte gjort språktestet</p>
                                                            <Button variant="info" as={Link} to="/languagetest">Gör testet nu</Button>
                                                        </Card.Body>
                                                    </RoundedCard>
                                                    :
                                                    null
                                            }
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col className="p-0">
                                            {partnerLoveLang && user.premium ?
                                                <LoveLangCard name={partner.name} lang={LoveLanguages[partnerLoveLang].name} handleClick={() => this.setState({ showModal: true, modalTitle: LoveLanguages[partnerLoveLang].name, modalText: LoveLanguages[partnerLoveLang].description })} />
                                                :
                                                user.premium && partner ?
                                                    <RoundedCard>
                                                        <Card.Body >
                                                            <small className="text-muted">{partner.name + "'s kärleksspråk"}</small>
                                                            <p>{partner.name} har ännu inte gjort språktestet</p>
                                                        </Card.Body>
                                                    </RoundedCard>
                                                    :
                                                    null
                                            }
                                        </Col>
                                    </Row>

                                    <Modal size="md" show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{this.state.modalTitle}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{this.state.modalText}</Modal.Body>
                                    </Modal>

                                    <AddPartnerModal show={this.state.showAddPartnerModal} user={user} handleHide={() => this.setState({ showAddPartnerModal: false })} />
                                </Container>
                            );
                        }}
                    </CoupleDataConsumer>
                )
                }
            </UserConsumer>
        );
    }
}

export default UserView;