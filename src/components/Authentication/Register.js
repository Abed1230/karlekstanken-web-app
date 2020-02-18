import React, { Component } from 'react';
import { auth, db } from '../../FirebaseData.js';
import { Alert, Spinner, Button, Row, Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import *as Yup from 'yup';
import MyStrings from '../../MyStrings.js';
import { EMAIL_ALREADY_IN_USE } from '../../AuthErrorCodes.js';
import AuthBaseLayout from './AuthBaseLayout.js';
import { addPartner } from '../../MyCloudFunctions.js';
import { Redirect } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .required(MyStrings.Errors.fieldRequired),
    lastName: Yup.string()
        .required(MyStrings.Errors.fieldRequired),
    email: Yup.string()
        .email(MyStrings.Errors.invalidEmail)
        .required(MyStrings.Errors.fieldRequired),
    password: Yup.string()
        .min(6, MyStrings.Errors.passwordTooShort)
        .required(MyStrings.Errors.fieldRequired),
});

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            loading: false,
            error: null,
        };

        this.signup = this.signup.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async signup(values) {
        this.setState({ loading: true });

        const email = values.email.toLowerCase();
        await auth.createUserWithEmailAndPassword(email, values.password).then((user) => {
            // Create user document in db
            return db.collection("users").doc(user.user.uid).set({
                email: email,
                firstName: values.firstName,
                lastName: values.lastName,
            });
        }).then(() => {
            // if URL includes partnerUID then go ahead and add partner
            const partnerUID = this.props.match.params.partnerUID;
            if (partnerUID) {
                return addPartner(null, partnerUID);
            }
        }).then(() => {
            if (this.mounted) {
                this.setState({ redirect: true });
            }
        }).catch((e) => {
            console.log(e);
            if (!e.code.includes("auth")) {
                this.setState({ redirect: true });
            }

            let msg = "";
            switch (e.code) {
                case EMAIL_ALREADY_IN_USE:
                    msg = MyStrings.Errors.emailAlreadyInUse;
                    break;
                default:
                    msg = MyStrings.Errors.unknown;
                    break;
            }
            this.setState({ loading: false, error: msg });
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        return (
            <AuthBaseLayout>
                <Row>
                    <Col>
                        <Formik
                            initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
                            validationSchema={RegisterSchema}
                            onSubmit={this.signup}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) =>
                                (<Form noValidate={true} onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="firstNameForm">
                                                <Form.Label>{MyStrings.firstName}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    placeholder={MyStrings.firstNamePlaceholder}
                                                    value={values.firstName}
                                                    isInvalid={touched.firstName && !!errors.firstName}
                                                    onChange={handleChange} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.firstName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="lastNameForm">
                                                <Form.Label>{MyStrings.lastName}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    placeholder={MyStrings.lastNamePlaceholder}
                                                    value={values.lastName}
                                                    isInvalid={touched.lastName && !!errors.lastName}
                                                    onChange={handleChange} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.lastName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
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
                                    <Form.Group controlId="passwordForm">
                                        <Form.Label>{MyStrings.Auth.passwordFieldLabel}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder={MyStrings.passwordPlaceholder}
                                            value={values.password}
                                            isInvalid={touched.password && !!errors.password}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {this.state.error &&
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    }
                                    <p className="text-muted text-center" style={{ fontSize: "0.95rem" }}>
                                        {MyStrings.Auth.bySigningUp} <a href={MyStrings.licenseAndTermsUrl} target="_blank">{MyStrings.Auth.theLicenseAndTerms}</a> {MyStrings.and} <a href={MyStrings.privacyPolicyUrl} target="_blank">{MyStrings.Auth.thePrivacyPolicy}</a>
                                    </p>
                                    {this.state.loading ?
                                        <div className="p-2 text-center">
                                            <Spinner className="p-2" animation="border" variant="info" />
                                        </div>
                                        :
                                        <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.Auth.signUpBtn}</Button>
                                    }
                                </Form>)
                            }
                        </Formik>
                    </Col>
                </Row>
            </AuthBaseLayout>
        );
    }
}

export default Register