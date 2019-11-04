import React from 'react';
import MyTitleBar from './MyTitleBar';
import { Row, Col, Container, Card, Dropdown } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';
import strftime from 'strftime';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                    <Row className="mt-4 justify-content-center">
                                        <Col md="6">
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
                                                            Betalt {this.timeStampToDateString(user.premium.since)}
                                                            <br />
                                                            <mark>Upphör att gälla {this.timeStampToDateString(user.premium.expiry)}</mark>
                                                        </p>
                                                        :
                                                        <p>Du har inte köpt license</p>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
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