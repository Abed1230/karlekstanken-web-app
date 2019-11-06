import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';

class DeleteAccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            success: false,
        };

        this.hideAndReset = this.hideAndReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideAndReset() {
        this.props.handleHide();
        this.setState({
            validated: false,
            error: null,
            success: false,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        // TODO: call delete account cloud function
        this.setState({ loading: true, error: null, success: false });
        setTimeout(() => {
            this.setState({
                loading: false,
                error: "Ett okänt fel inträffade. Försök igen senare",
            });
            //this.hideAndReset();
        }, 3000);
    }

    render() {
        const user = this.props.user;
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {user.partner && user.premium ?
                            "Är du säker på att du vill avsluta ditt och " + user.partner.name + "'s konto?"
                            :
                            "Är du säker på att du vill avsluta ditt konto?"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.success ?
                        <Alert variant="success">Yay!</Alert>
                        :
                        <>
                            {user.partner && user.premium &&
                                <p className="text-danger">Observera att om du avslutar ditt konto avslutas även din partners konto. Er licens upphör också att gälla. Detta har omedelbar verkan och kan inte ångras!</p>
                            }
                            {this.state.error &&
                                <Alert variant="danger">{this.state.error}</Alert>
                            }
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        <>
                            <Button className="mr-2" variant="danger" onClick={this.handleSubmit}>Avsluta</Button>
                            <Button variant="info" onClick={this.hideAndReset}>Avbryt</Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteAccountModal;