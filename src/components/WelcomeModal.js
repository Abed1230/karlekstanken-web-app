import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { StringsConsumer } from '../contexts/StringsContext';
import MyStrings from '../MyStrings.js';

const WelcomeModal = ({ show, handleHide }) => (
    <StringsConsumer>
        {strings => (
            <Modal size="lg" show={show} onHide={handleHide}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {strings && strings.welcomeModalHTML ?
                        <div dangerouslySetInnerHTML={{ __html: strings.welcomeModalHTML }} />
                        :
                        <Spinner className="d-block mx-auto" animation="border" variant="info" />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-auto" variant="info" onClick={handleHide}>{MyStrings.welcomeModalBtn}</Button>
                </Modal.Footer>
            </Modal>
        )}
    </StringsConsumer>
);

export default WelcomeModal;