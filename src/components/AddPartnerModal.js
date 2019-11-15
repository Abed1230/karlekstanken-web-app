import React from 'react';
import { Modal, Spinner, Form, Alert, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { sendPartnerRequest } from '../MyCloudFunctions';
import MyStrings from '../MyStrings.json';

const EmailSchema = Yup.object().shape({
    email: Yup.string()
        .email(MyStrings.errors.invalidEmail)
        .required(MyStrings.errors.fieldRequired)
});

class AddPartnerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            success: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideAndReset(resetForm) {
        if (resetForm) {
            resetForm();
        }
        this.props.handleHide();
        setTimeout(() => {
            this.setState({
                error: null,
                loading: false,
                success: false,
            });
        }, 500);
    }

    async handleSubmit({ email }, { setErrors }) {
        this.setState({ loading: true, error: null });

        let error = await sendPartnerRequest(email);

        if (error) {
            setErrors({ email: " " });
            this.setState({ loading: false, error: error });
        } else {
            this.setState({ loading: false, error: null, success: true });
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={EmailSchema}
                onSubmit={this.handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (
                    <Modal show={this.props.show} onHide={this.hideAndReset.bind(this, resetForm)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Lägg till partner</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.success ?
                                <>
                                    <Alert variant="success">
                                        Partner förfrågan skickades. Din partner hittar förfågan i menyn uppe i högra hörnet.
                                    </Alert>
                                    <Button variant="info" onClick={this.hideAndReset.bind(this, resetForm)}>Stäng</Button>
                                </>
                                :
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="emailField">
                                        <Form.Label>
                                            Ange din partners e-postadress som hen registrerade sig med på kärlekstanken
                                    </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="E-postadress"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                        <p className="text-muted mt-2" style={{ fontSize: "0.95rem" }}>
                                            Din e-postadress: {this.props.user.email}
                                        </p>
                                    </Form.Group>
                                    {this.state.error &&
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    }
                                    {this.state.loading ?
                                        <Spinner animation="border" variant="info" />
                                        :
                                        <Button variant="info" type="submit">Skicka förfrågan</Button>
                                    }
                                </Form>
                            }
                        </Modal.Body>
                    </Modal>
                )}
            </Formik>
        );
    }
}

export default AddPartnerModal;