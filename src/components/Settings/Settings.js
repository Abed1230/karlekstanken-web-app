import React from 'react';
import MyTitleBar from '../MyTitleBar';
import { Row, Col, Container, Card, Dropdown, Button } from 'react-bootstrap';
import { UserConsumer } from '../../UserContext';
import strftime from 'strftime';
import ChangePasswordModal from './ChangePasswordModal';
import RemovePartnerModal from './RemovePartnerModal';
import DeleteAccountModal from './DeleteAccountModal';
import MyStrings from '../../MyStrings.js';

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
        return strftime('%F', new Date(ts));
    }

    render() {
        return (
            <>
                <MyTitleBar title={MyStrings.Settings.title} />
                <UserConsumer>
                    {user => {
                        return user ?
                            (
                                <Container>
                                    <Row>
                                        <Col className="mt-4" md="6">
                                            <Card>
                                                <Card.Body>
                                                    <h5 className="text-center">{MyStrings.Settings.signedInAs}</h5>
                                                    <p>
                                                        {MyStrings.name}: {user.firstName + " " + user.lastName}
                                                        <br />
                                                        {MyStrings.email}: {user.email}
                                                    </p>

                                                    <Dropdown.Divider className="mt-3" />
                                                    <span><strong>{MyStrings.partner}</strong></span>
                                                    {user.partner ?
                                                        <p>
                                                            {MyStrings.name}: {user.partner.name}
                                                            <br />
                                                            {MyStrings.email}: {user.partner.email}
                                                        </p>
                                                        :
                                                        <p>{MyStrings.Settings.youHaveNoPartner}</p>
                                                    }

                                                    <Dropdown.Divider className="mt-3" />
                                                    <span><strong>{MyStrings.licens}</strong></span>
                                                    {user.premium ?
                                                        <p>
                                                            {MyStrings.since} {this.timeStampToDateString(user.premium.since)}
                                                            <br />
                                                            {MyStrings.through} {this.timeStampToDateString(user.premium.expiry)}
                                                        </p>
                                                        :
                                                        <p>{MyStrings.Settings.youHaveNoLicense}</p>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col className="mt-4" md="6">
                                            <Button className="mb-4 border" variant="light" block onClick={() => this.setState({ showChangePasswordModal: true })}>{MyStrings.Settings.changePasswordBtn}</Button>
                                            {!user.premium && user.partner &&
                                                <>
                                                    <Button variant="outline-danger" block onClick={() => this.setState({ showRemovePartnerModal: true })}>{MyStrings.Settings.removePartnerBtn}</Button>
                                                    <small className="mt-2 text-muted">{MyStrings.Settings.removePartnerNote}</small>
                                                </>
                                            }
                                            <Dropdown.Divider />
                                            <div className="mb-5 text-right">
                                                <Button className="mt-3 mb-3" size="sm" variant="danger" onClick={() => this.setState({ showDeleteAccountModal: true })}>{MyStrings.Settings.deletAccountBtn}</Button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <ChangePasswordModal show={this.state.showChangePasswordModal} handleHide={() => this.setState({ showChangePasswordModal: false })} />

                                    <RemovePartnerModal show={this.state.showRemovePartnerModal} user={user} handleHide={() => this.setState({ showRemovePartnerModal: false })} />

                                    <DeleteAccountModal show={this.state.showDeleteAccountModal} user={user} handleHide={() => this.setState({ showDeleteAccountModal: false })} />
                                </Container>
                            )
                            :
                            /* Incase user doc has been delete but not firebase auth user */
                            <Container>
                                <Row className="mt-3 mb-3">
                                    <Col>
                                        <Button size="sm" variant="danger" onClick={() => this.setState({ showDeleteAccountModal: true })}>{MyStrings.Settings.deletAccountBtn}</Button>
                                    </Col>
                                </Row>
                                <DeleteAccountModal show={this.state.showDeleteAccountModal} handleHide={() => this.setState({ showDeleteAccountModal: false })} />
                            </Container>
                    }
                    }
                </UserConsumer>
            </>
        );
    }
}

export default Settings;