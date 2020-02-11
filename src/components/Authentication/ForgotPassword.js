import React from 'react';
import { Button, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyStrings from '../../MyStrings.json';
import { auth } from '../../FirebaseData';
import { USER_NOT_FOUND } from '../../AuthErrorCodes.js';
import AuthBaseLayout from './AuthBaseLayout.js';

const Schema = Yup.object().shape({
    email: Yup.string()
        .email(MyStrings.errors.invalidEmail)
        .required(MyStrings.errors.fieldRequired)
});

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            success: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ email }) {
        this.setState({ loading: true });
        auth.sendPasswordResetEmail(email).then(() => {
            // Email sent
            this.setState({ loading: false, success: true });
        }).catch((e) => {
            console.log(e);
            let msg = "";
            switch (e.code) {
                case USER_NOT_FOUND:
                    msg = MyStrings.errors.userNotFound;
                    break;
                default:
                    msg = MyStrings.erros.unknown;
                    break;
            }
            this.setState({ loading: false, error: msg });
        });
    }

    render() {
        if (this.state.success) {
            return (
                <AuthBaseLayout goBackRoute="/signin">
                    <Row>
                        <Col>
                            <p>{MyStrings.passwordResetSentMsg}</p>
                        </Col>
                    </Row>
                </AuthBaseLayout>
            );
        }

        return (
            <AuthBaseLayout goBackRoute="/signin">
                <Row>
                    <Col>
                        <p>{MyStrings.passwordResetInfo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={Schema}
                            onSubmit={this.handleSubmit} >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                                <Form noValidate={true} onSubmit={handleSubmit}>
                                    <Form.Group controlId="emailForm">
                                        <Form.Label>{MyStrings.email}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder={MyStrings.emailPlaceholder}
                                            value={values.email}
                                            isInvalid={touched.email && !!errors.email}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {this.state.error &&
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    }
                                    {this.state.loading ?
                                        <div className="p-2 text-center">
                                            <Spinner className="p-2" animation="border" variant="info" />
                                        </div>
                                        :
                                        <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.send}</Button>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </AuthBaseLayout>
        );
    }
}

export default ForgotPassword;