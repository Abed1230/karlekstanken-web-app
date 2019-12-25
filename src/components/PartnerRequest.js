import React from 'react';
import { Spinner, Card, Button } from 'react-bootstrap';
import { cancelPartnerRequest, acceptPartnerRequest, rejectPartnerRequest } from '../MyCloudFunctions';
import RoundedCard from './RoundedCard';

class ReceivedPartnerRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    async handleAccept() {
        this.setState({ loading: true })
        await acceptPartnerRequest();
        this.setState({ loading: false });
    }

    async handleReject() {
        this.setState({ loading: true })
        await rejectPartnerRequest();
        this.setState({ loading: false });
    }

    render() {
        const { name, email } = this.props;
        return (
            <RoundedCard>
                <Card.Header>Partner förfrågan mottagen</Card.Header>
                <Card.Body>
                    <p><span className="font-italic">{name} ({email})</span> vill lägga till dig som partner</p>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        <div>
                            <Button variant="info" onClick={this.handleAccept}>Acceptera</Button>
                            <Button variant="light" className="ml-3" onClick={this.handleReject}>Avböj</Button>
                        </div>
                    }
                </Card.Body>
            </RoundedCard>
        );
    }
}

class SentPartnerRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleCancel = this.handleCancel.bind(this);
    }

    async handleCancel() {
        /* TODO: call cancelPartnerRequest cloud function */
        this.setState({ loading: true });
        await cancelPartnerRequest();
        this.setState({ loading: false });
    }

    render() {
        const { name, email } = this.props;
        return (
            <RoundedCard>
                <Card.Header>Partner förfrågan skickad</Card.Header>
                <Card.Body>
                    <p>Väntar på att <span className="font-italic">{name} ({email})</span> ska acceptera din förfrågan</p>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        <Button variant="light" className="ml-2" onClick={this.handleCancel}>Avbryt</Button>
                    }
                </Card.Body>
            </RoundedCard >
        );
    }
}

export { ReceivedPartnerRequest, SentPartnerRequest };