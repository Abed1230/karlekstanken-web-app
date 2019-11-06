import React from 'react';
import MyTitleBar from '../MyTitleBar';
import { Row, Col, Container, Card, Dropdown, Button } from 'react-bootstrap';
import { UserConsumer } from '../../UserContext';
import strftime from 'strftime';
import ChangePasswordModal from './ChangePasswordModal';
import RemovePartnerModal from './RemovePartnerModal';
import DeleteAccountModal from './DeleteAccountModal';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChangePasswordModal: false,
            showRemovePartnerModal: false,
            showDeleteAccountModal: false,
        };
    }

    timeStampToDateString(ts) {
        return strftime('%F %T', ts.toDate());
    }

    render() {
        return (
            <>
                <MyTitleBar title="Inställningar" />
                <UserConsumer>
                    {user => {
                        return user ?
                            (
                                <Container>
                                    <Row>
                                        <Col className="mt-4" md="6">
                                            <Card>
                                                <Card.Body>
                                                    <h5 className="text-center">Inloggad som</h5>
                                                    <p>
                                                        {user.firstName + " " + user.lastName}
                                                        <br />
                                                        E-postaddress: {user.email}
                                                    </p>

                                                    <Dropdown.Divider className="mt-3" />
                                                    <span><strong>Partner</strong></span>
                                                    {user.partner ?
                                                        <p>
                                                            {user.partner.name}
                                                            <br />
                                                            E-postaddress: {user.partner.email}
                                                        </p>
                                                        :
                                                        <p>Du har inte laggt till någon partner ännu</p>
                                                    }

                                                    <Dropdown.Divider className="mt-3" />
                                                    <span><strong>Licens</strong></span>
                                                    {user.premium ?
                                                        <p>
                                                            Sedan {this.timeStampToDateString(user.premium.since)}
                                                            <br />
                                                            <mark>Upphör att gälla {this.timeStampToDateString(user.premium.expiry)}</mark>
                                                        </p>
                                                        :
                                                        <p>Du har ingen licens</p>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col className="mt-4" md="6">
                                            <Button className="mb-4" variant="light" block onClick={() => this.setState({ showChangePasswordModal: true })}>Ändra lösenord</Button>
                                            {!user.premium && user.partner &&
                                                <>
                                                    <Button variant="outline-danger" block onClick={() => this.setState({ showRemovePartnerModal: true })}>Ta bort partner</Button>
                                                    <small className="mt-2 text-muted">Observera att du inte kan ta bort din partner när du har licens</small>
                                                </>
                                            }
                                            <Dropdown.Divider />
                                            <div className="mb-5 text-right">
                                                <Button className="mt-3 mb-3" size="sm" variant="danger" onClick={() => this.setState({ showDeleteAccountModal: true })}>Avsluta konto</Button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <ChangePasswordModal show={this.state.showChangePasswordModal} handleHide={() => this.setState({ showChangePasswordModal: false })} />

                                    <RemovePartnerModal show={this.state.showRemovePartnerModal} user={user} handleHide={() => this.setState({ showRemovePartnerModal: false })} />

                                    <DeleteAccountModal show={this.state.showDeleteAccountModal} user={user} handleHide={() => this.setState({ showDeleteAccountModal: false })} />
                                </Container>
                            )
                            :
                            null
                    }
                    }
                </UserConsumer>
            </>
        );
    }
}

export default Settings;