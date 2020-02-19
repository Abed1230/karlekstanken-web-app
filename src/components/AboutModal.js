import React from 'react';
import { Modal } from 'react-bootstrap';
import { StringsConsumer } from '../contexts/StringsContext.js';

const AboutModal = ({ show, handleHide }) => (
    <StringsConsumer>
        {strings => (
            <Modal size="lg" show={show} onHide={handleHide}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {strings && strings.aboutHTML &&
                        <div dangerouslySetInnerHTML={{ __html: strings.aboutHTML }} />
                    }
                </Modal.Body>
            </Modal>
        )}
    </StringsConsumer>
);

export default AboutModal;