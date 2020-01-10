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
        const showWarning = user && user.partner && user.premium;
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                {this.state.success ?
                    <Modal.Body>
                        <Alert variant="light">{user && user.partner ?
                            "Era konton är nu avslutade"
                            :
                            "Ditt konto är nu avslutad"
                        }
                        </Alert>
                    </Modal.Body>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>  {user && user.partner ?
                                "Är du säker på att du vill avsluta din och " + user.partner.name + "'s konto?"
                                :
                                "Är du säker på att du vill avsluta ditt konto?"
                            }
                            </Modal.Title>
                        </Modal.Header>
                        {showWarning &&
                            <Modal.Body>
                                <p className="text-danger">OBS: Om du avslutar ditt konto kommer er licens att upphöra.</p>
                                {this.state.error &&
                                    <Alert variant="danger">{this.state.error}</Alert>
                                }
                            </Modal.Body>
                        }
                        {this.state.error && !showWarning &&
                            <Modal.Body>
                                <Alert variant="danger">{this.state.error}</Alert>
                            </Modal.Body>
                        }
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
                                <Button className="mr-3" variant="danger" onClick={this.handleSubmit}>Avsluta</Button>
                                <Button variant="info" onClick={this.hideAndReset}>Avbryt</Button>
                            </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteAccountModal;