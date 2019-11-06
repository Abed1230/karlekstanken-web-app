import React from 'react';
import { Spinner, Modal, Button, Alert } from 'react-bootstrap';
import { removePartner } from '../../MyCloudFunctions';

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