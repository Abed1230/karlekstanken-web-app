import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { StringsConsumer } from '../contexts/StringsContext';

const WelcomeModal = ({ show, handleHide }) => (
    <StringsConsumer>
        {strings => (
            <Modal size="lg" show={show} onHide={handleHide}>
                <Modal.Header closeButton >
                    <Modal.Title>{strings && strings.welcomeModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {strings && strings.welcomeModalHTML ?
                        <div dangerouslySetInnerHTML={{ __html: strings.welcomeModalHTML }} />
                        :
                        <Spinner className="d-block mx-auto" animation="border" variant="info" />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-auto" variant="info" onClick={handleHide}>{strings && strings.welcomeModalButtonText}</Button>
                </Modal.Footer>
            </Modal>
        )}
    </StringsConsumer>
);

export default WelcomeModal;