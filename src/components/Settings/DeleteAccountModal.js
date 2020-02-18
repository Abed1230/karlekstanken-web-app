import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';
import { auth } from '../../FirebaseData';
import { deleteAccount } from '../../MyCloudFunctions';
import MyStrings from '../../MyStrings.js';

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
                            MyStrings.DeleteAccountModal.success2
                            :
                            MyStrings.DeleteAccountModal.success1
                        }
                        </Alert>
                    </Modal.Body>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>  {user && user.partner ?
                                MyStrings.DeleteAccountModal.title2 + " " + user.partner.name + MyStrings.DeleteAccountModal.account
                                :
                                MyStrings.DeleteAccountModal.title1
                            }
                            </Modal.Title>
                        </Modal.Header>
                        {showWarning &&
                            <Modal.Body>
                                <p className="text-danger">{MyStrings.DeleteAccountModal.warningText}</p>
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
                            <Button variant="info" onClick={() => auth.signOut()}>{MyStrings.signOut}</Button>
                            :
                            <>
                                <Button className="mr-3" variant="danger" onClick={this.handleSubmit}>{MyStrings.DeleteAccountModal.deleteBtn}</Button>
                                <Button variant="info" onClick={this.hideAndReset}>{MyStrings.cancel}</Button>
                            </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteAccountModal;