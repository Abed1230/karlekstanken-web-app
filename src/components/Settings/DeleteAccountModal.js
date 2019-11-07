import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';
import { auth } from '../../FirebaseData';
import { deleteAccount } from '../../MyCloudFunctions';

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
        if (!this.state.success) {
            this.props.handleHide();
            setTimeout(() => {
                this.setState({
                    validated: false,
                    error: null,
                    success: false,
                });
            }, 500);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ loading: true, error: null, success: false });

        const error = await deleteAccount();

        this.setState({ loading: false, error: error, success: !error });
    }

    render() {
        const user = this.props.user;
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                {this.state.success ?
                    <Modal.Body>
                        <Alert variant="light">{user.partner && user.premium ?
                            "Era konton är nu avslutade. Ni behöver själva logga ut från era enheter"
                            :
                            "Ditt konto är nu avslutad. Du behöver själv logga ut från dina enheter"
                        }
                        </Alert>
                    </Modal.Body>
                    :
                    <>
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
                            {user.partner && user.premium &&
                                <p className="text-danger">Observera att om du avslutar ditt konto avslutas även din partners konto. Er licens upphör också att gälla. Detta har omedelbar verkan och kan inte ångras!</p>
                            }
                            {this.state.error &&
                                <Alert variant="danger">{this.state.error}</Alert>
                            }
                        </Modal.Body>
                    </>
                }
                <Modal.Footer>
                    {this.state.loading ?
                        <Spinner animation="border" variant="info" />
                        :
                        this.state.success ?
                            <Button variant="info" onClick={() => auth.signOut()}>Logga ut mig från denna enhet</Button>
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