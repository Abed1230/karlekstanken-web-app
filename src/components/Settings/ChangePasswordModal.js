import React from 'react';
import { Spinner, Form, Modal, Button, Alert } from 'react-bootstrap';
import { auth, EmailAuthProvider } from '../../FirebaseData';
import { WRONG_PASSWORD } from '../../AuthErrorCodes';

class ChangePasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
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

        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            this.setState({ validated: true, loading: true, error: null, success: false });

            const currPassword = form.elements.currPassword.value;
            const newPassword = form.elements.newPassword.value;

            try {
                // Re authenticate
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(user.email, currPassword);
                await user.reauthenticateWithCredential(credential);

                // Update password
                await user.updatePassword(newPassword);

                this.setState({ loading: false, success: true });
            } catch (e) {
                console.log(e);
                switch (e.code) {
                    case WRONG_PASSWORD:
                        this.setState({ loading: false, error: "Du har angivit fel nuvarande lösenord. Försök igen", validated: false });
                        break;
                    default:
                        this.setState({ loading: false, error: "Ett okänt fel inträffade. Försök igen", validated: false });
                        break;
                }
            }
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                <Modal.Header closeButton>
                    <Modal.Title>Ändra lösenord</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <div className="p-2">
                            {this.state.success ?
                                <Alert variant="success">Ditt lösenord har nu ändrats</Alert>
                                :
                                <>
                                    <Form.Group controlId="currPasswordField">
                                        <Form.Label>Ditt nuvarande lösenord</Form.Label>
                                        <Form.Control required type="password" name="currPassword" placeholder="Nuvarande lösenord" pattern=".{6,}" title="Lösenordet måste bestå av minst 6 tecken" />
                                    </Form.Group>
                                    <Form.Group controlId="newPassWordField">
                                        <Form.Label>Nytt lösenord</Form.Label>
                                        <Form.Control required type="password" name="newPassword" placeholder="Nytt lösenord" pattern=".{6,}" title="Lösenordet måste bestå av minst 6 tecken" />
                                    </Form.Group>
                                    {this.state.error &&
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    }
                                </>
                            }
                        </div>
                        <Modal.Footer>
                            {this.state.loading ?
                                <Spinner animation="border" variant="info" />
                                :
                                this.state.success ?
                                    <Button variant="info" onClick={this.hideAndReset}>Stäng</Button>
                                    :
                                    <>
                                        <Button variant="light" onClick={this.hideAndReset}>Avbryt</Button>
                                        <Button variant="info" type="submit">Spara</Button>
                                    </>
                            }
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ChangePasswordModal;