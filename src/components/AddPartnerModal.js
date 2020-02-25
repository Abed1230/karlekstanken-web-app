import React from 'react';
import { Modal, Spinner, Form, Alert, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPartner, sendInvite } from '../MyCloudFunctions';
import MyStrings from '../MyStrings.js';

const EmailSchema = Yup.object().shape({
    email: Yup.string()
        .email(MyStrings.Errors.invalidEmail)
        .required(MyStrings.Errors.fieldRequired)
});

function Undetermined({ handleYes, handleNo }) {
    return (
        <>
            <h6>{MyStrings.AddPartnerModal.undeterminedViewText}</h6>
            <Button block variant="info" onClick={(handleYes)}>{MyStrings.AddPartnerModal.undeterminedViewYesBtn}</Button>
            <Button block variant="info" onClick={handleNo}>{MyStrings.AddPartnerModal.undeterminedViewNoBtn}</Button>
        </>
    );
}

function Add({ handleSubmit, handleChange, values, errors, touched, error, loading, userEmail }) {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="emailField">
                <Form.Label>{MyStrings.AddPartnerModal.addViewFormLabel}</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder={MyStrings.email}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email} />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                <p className="text-muted mt-2" style={{ fontSize: "0.95rem" }}>
                    {MyStrings.yourEmail}: {userEmail}
                </p>

            </Form.Group>
            {error &&
                <Alert variant="danger">{error}</Alert>
            }
            {loading ?
                <div className="text-center">
                    <Spinner animation="border" variant="info" />
                </div>
                :
                <Button block variant="info" type="submit">{MyStrings.AddPartnerModal.addViewFormSubmit}</Button>
            }
        </Form>
    );
}

function Invite({ handleSubmit, handleChange, values, errors, touched, error, loading }) {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <p>{MyStrings.AddPartnerModal.inviteViewText1}</p>
            <Form.Group controlId="emailField">
                <Form.Label>{MyStrings.AddPartnerModal.inviteViewFormLabel}</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder={MyStrings.email}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email} />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            {error &&
                <Alert variant="danger">{error}</Alert>
            }
            {loading ?
                <div className="text-center">
                    <Spinner animation="border" variant="info" />
                </div>
                :
                <Button block variant="info" type="submit">{MyStrings.AddPartnerModal.inviteViewFormSubmit}</Button>
            }
        </Form>
    );
}

const UNDETERMINED_VIEW = "Undetermined";
const ADD_VIEW = "Add";
const INVITE_VIEW = "Invite"

class AddPartnerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toRender: UNDETERMINED_VIEW,
            loading: false,
            error: null,
            success: false,
        };

        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInvite = this.handleInvite.bind(this);
    }

    hideAndReset(resetForm) {
        if (resetForm) {
            resetForm();
        }
        this.props.handleHide();
        setTimeout(() => {
            this.setState({
                toRender: UNDETERMINED_VIEW,
                error: null,
                loading: false,
                success: false,
            });
        }, 500);
    }

    async handleAdd({ email }, { setErrors }) {
        this.setState({ loading: true, error: null });
        console.log(email);
        const error = await addPartner(email);
        if (error) {
            setErrors({ email: " " });
            this.setState({ loading: false, error: error });
        } else {
            this.setState({ loading: false, error: null, success: true });
        }
    }

    async handleInvite({ email }, { setErrors }) {
        this.setState({ loading: true, error: null });

        const userFullName = this.props.user.firstName + " " + this.props.user.lastName;
        const error = await sendInvite(email, userFullName);
        if (error) {
            this.setState({ loading: false, error: error });
        } else {
            this.setState({ loading: false, error: null, success: true });
        }
    }

    handleYes() {
        this.setState({
            toRender: ADD_VIEW
        });
    }

    handleNo() {
        this.setState({
            toRender: INVITE_VIEW
        });
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={EmailSchema}
                onSubmit={this.state.toRender === ADD_VIEW ? this.handleAdd : this.handleInvite}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (
                    <Modal show={this.props.show} onHide={this.hideAndReset.bind(this, resetForm)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.toRender === INVITE_VIEW ? MyStrings.AddPartnerModal.title2 : MyStrings.AddPartnerModal.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="pb-4">
                            {this.state.success ?
                                <>
                                    <Alert variant="success">
                                        {this.state.toRender === ADD_VIEW ?
                                            <>
                                                {this.props.user.partner && this.props.user.partner.name} {MyStrings.AddPartnerModal.addSuccess}
                                            </>
                                            :
                                            <>
                                                {MyStrings.AddPartnerModal.inviteSuccess} {values.email}
                                            </>
                                        }

                                    </Alert>
                                </>
                                :
                                <>
                                    {this.state.toRender === UNDETERMINED_VIEW &&
                                        <Undetermined handleYes={this.handleYes} handleNo={this.handleNo} />
                                    }
                                    {this.state.toRender === ADD_VIEW &&
                                        <Add
                                            handleSubmit={handleSubmit}
                                            handleChange={handleChange}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            error={this.state.error}
                                            loading={this.state.loading}
                                            userEmail={this.props.user.email}
                                        />
                                    }
                                    {this.state.toRender === INVITE_VIEW &&
                                        <Invite
                                            handleSubmit={handleSubmit}
                                            handleChange={handleChange}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            error={this.state.error}
                                            loading={this.state.loading}
                                        />
                                    }
                                </>
                            }
                        </Modal.Body>
                    </Modal>
                )}
            </Formik>
        );
    }
}

export default AddPartnerModal; 