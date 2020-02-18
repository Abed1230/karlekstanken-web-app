import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';
import { removePartner } from '../../MyCloudFunctions';
import MyStrings from '../../MyStrings.js';

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
        setTimeout(() => {
            this.setState({
                error: null,
            });
        }, 500);
    }

    async handleDelete() {
        this.setState({ loading: true, error: null });

        const error = await removePartner();

        if (error) {
            this.setState({
                loading: false,
                error: error,
            });
        } else {
            this.setState({ loading: false });
            this.hideAndReset();
        }
    }

    render() {
        const user = this.props.user;
        return (
            <Modal show={this.props.show} onHide={this.hideAndReset}>
                <Modal.Header closeButton>
                    <Modal.Title>{MyStrings.RemovePartnerModal.areYouSure} {user.partner && user.partner.name} {MyStrings.RemovePartnerModal.asPartner}</Modal.Title>
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
                            <Button className="mr-3" variant="danger" onClick={this.handleDelete}>{MyStrings.RemovePartnerModal.removeBtn}</Button>
                            <Button variant="info" onClick={this.hideAndReset}>{MyStrings.cancel}</Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RemovePartnerModal;