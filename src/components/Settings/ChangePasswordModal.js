import React from 'react';
import { Spinner, Form, Modal, Button, Alert } from 'react-bootstrap';
import { auth, EmailAuthProvider } from '../../FirebaseData';
import { WRONG_PASSWORD } from '../../AuthErrorCodes';
import MyStrings from '../../MyStrings.json';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, MyStrings.errors.passwordTooShort)
        .required(MyStrings.errors.fieldRequired),
    newPassword: Yup.string()
        .min(6, MyStrings.errors.passwordTooShort)
        .required(MyStrings.errors.fieldRequired),
    confirmPassword: Yup.string()
        .min(6, MyStrings.errors.passwordTooShort)
        .required(MyStrings.errors.fieldRequired)
        .oneOf([Yup.ref("newPassword"), null], MyStrings.errors.passwordMismatch),
});

class ChangePasswordModal extends React.Component {
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
                success: false,
                loading: false,
            });
        }, 500);
    }

    async handleSubmit({ currentPassword, newPassword }, { setErrors }) {
        this.setState({ loading: true, error: null, success: false });

        try {
            // Re authenticate
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await user.reauthenticateWithCredential(credential);

            // Update password
            await user.updatePassword(newPassword);

            this.setState({ loading: false, success: true });
        } catch (e) {
            console.log(e);
            if (e.code === WRONG_PASSWORD) {
                setErrors({ currentPassword: " " });
                this.setState({
                    loading: false,
                    error: "Du har angivit fel nuvarande lösenord. Försök igen"
                });

            } else {
                this.setState({
                    loading: false,
                    error: MyStrings.errors.unknown
                });
            }
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={this.handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (
                    <Modal show={this.props.show} onHide={this.hideAndReset.bind(this, resetForm)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ändra lösenord</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.success ?
                                <Alert variant="success">Ditt lösenord har nu ändrats</Alert>
                                :
                                <Form noValidate>
                                    <Form.Group controlId="currentPasswordField">
                                        <Form.Label>Ditt nuvarande lösenord</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Nuvarande lösenord"
                                            value={values.currentPassword}
                                            onChange={handleChange}
                                            isInvalid={touched.currentPassword && !!errors.currentPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.currentPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="newPassWordField">
                                        <Form.Label>Nytt lösenord</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="newPassword"
                                            placeholder="Nytt lösenord (minst 6 tecken)"
                                            value={values.newPassword}
                                            onChange={handleChange}
                                            isInvalid={touched.newPassword && !!errors.newPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassWordField">
                                        <Form.Label>Bekräfta nytt lösenord</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Bekräfta nytt lösenord"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={touched.confirmPassword && !!errors.confirmPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.error &&
                                <Alert variant="danger">{this.state.error}</Alert>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            {this.state.loading ?
                                <Spinner animation="border" variant="info" />
                                :
                                this.state.success ?
                                    <Button variant="info" onClick={this.hideAndReset.bind(this, resetForm)}>Stäng</Button>
                                    :
                                    <>
                                        <Button variant="light" onClick={this.hideAndReset.bind(this, resetForm)}>Avbryt</Button>
                                        <Button variant="info" onClick={handleSubmit}>Spara</Button>
                                    </>
                            }
                        </Modal.Footer>
                    </Modal>
                )
                }
            </Formik>
        );
    }
}

export default ChangePasswordModal;