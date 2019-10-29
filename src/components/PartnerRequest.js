import React from 'react';
import { Spinner, Card, Button } from 'react-bootstrap';

class ReceivedPartnerRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    handleAccept() {
        {/* TODO: call acceptPartnerRequest cloud function */ }
        this.setState({ loading: true })
    }

    handleReject() {
        {/* TODO: call rejectPartnerRequest cloud function */ }
        this.setState({ loading: true })
    }

    render() {
        const { name, email } = this.props;
        return (
            <Card>
                <Card.Header>Partner förfrågan</Card.Header>
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
            </Card>
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

    handleCancel() {
        /* TODO: call cancelPartnerRequest cloud function */
        this.setState({ loading: true })
    }

    render() {
        const { name, email } = this.props;
        return (
            <Card>
                <Card.Header>Partner förfrågan</Card.Header>
                <Card.Body>
                    <p>Väntar på att <span className="font-italic">{name} ({email})</span> ska acceptera din förfrågan</p>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        <Button variant="light" className="ml-2" onClick={this.handleCancel}>Avbryt</Button>
                    }
                </Card.Body>
            </Card >
        );
    }
}

export { ReceivedPartnerRequest, SentPartnerRequest };