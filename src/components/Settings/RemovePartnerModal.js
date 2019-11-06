import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';

class RemovePartnerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
        };

        this.hideAndReset = this.hideAndReset.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    hideAndReset() {
        this.props.handleHide();
        this.setState({
            error: null,
        });
    }

    async handleDelete() {
        // TODO: call remove partner cloud function
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                error: "Kunde inte ta bort din partner. Ett okänt fel inträffade. Försök igen senare",
            });
            //this.hideAndReset();
        }, 3000);
    }

    render() {
        const user = this.props.user;
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                <Modal.Header closeButton>
                    <Modal.Title>Är du säker på att du vill ta bort {user.partner && user.partner.name} som partner?</Modal.Title>
                </Modal.Header>
                {this.state.error &&
                    <Modal.Body>
                        <Alert variant="danger">{this.state.error}</Alert>
                    </Modal.Body>
                }
                <Modal.Footer>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        <>
                            <Button variant="danger" onClick={this.handleDelete}>Ta bort</Button>
                            <Button variant="info" onClick={this.hideAndReset}>Avbryt</Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RemovePartnerModal;