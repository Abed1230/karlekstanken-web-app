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
                        <Alert variant="success">{user.partner && user.premium ?
                            "Ditt konto är nu avslutade. Om " + user.partner.className + " också vill avsluta sitt konto måste hen göra det separat"
                            :
                            "Ditt konto är nu avslutad"
                        }
                        </Alert>
                    </Modal.Body>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Är du säker på att du vill avsluta ditt konto?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {user.partner && user.premium &&
                                <p className="text-danger">Observera att er licens kommer sluta gälla för bägge om du avslutar ditt konto</p>
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
                            <Button variant="info" onClick={() => auth.signOut()}>Logga ut</Button>
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