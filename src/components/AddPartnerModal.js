import React from 'react';
import { Modal, Spinner, Form, Alert, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPartner } from '../MyCloudFunctions';
import { StringsConsumer } from '../contexts/StringsContext';
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

function AddForm({ handleSubmit, handleChange, values, errors, touched, error, loading, userEmail }) {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="emailField">
                <Form.Label>{MyStrings.AddPartnerModal.addFormViewLabel}</Form.Label>
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
                <Spinner animation="border" variant="info" />
                :
                <Button block variant="info" type="submit">{MyStrings.AddPartnerModal.addFormViewAddBtn}</Button>
            }
        </Form>
    );
}

function Invite({ handleClick }) {
    return (
        <>
            <p>{MyStrings.AddPartnerModal.inviteViewText1}</p>
            <Button className="mb-2" block variant="info" onClick={handleClick}>{MyStrings.AddPartnerModal.inviteViewInviteBtn}</Button>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>{MyStrings.AddPartnerModal.inviteViewText2}</p>
        </>
    );
}

const UNDETERMINED_VIEW = "Undetermined";
const ADD_FORM_VIEW = "AddForm";
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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
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

    async handleSubmit({ email }, { setErrors }) {
        this.setState({ loading: true, error: null });

        const error = await addPartner(email);
        if (error) {
            setErrors({ email: " " });
            this.setState({ loading: false, error: error });
        } else {
            this.setState({ loading: false, error: null, success: true });
        }
    }

    handleShare(strings, userFullName) {
        let invitationTitle = strings && strings.invitationTitle;
        if (invitationTitle)
            invitationTitle = invitationTitle.replace(/XXXX/g, userFullName);

        let invitationText = strings && strings.invitationText;
        if (invitationText) {
            invitationText = invitationText.replace(/XXXX/g, userFullName);
            invitationText = invitationText.replace(/\\n/g, '\n');
        }

        if (window.navigator.share) {
            window.navigator.share({
                title: invitationTitle,
                text: invitationText,
            });
        } else {
            const mail = document.createElement("a");
            mail.href = "mailto:?subject=" + invitationTitle + "&body=" + encodeURIComponent(invitationText);
            mail.click();
        }
    }

    handleYes() {
        this.setState({
            toRender: ADD_FORM_VIEW
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
                onSubmit={this.handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (
                    <Modal show={this.props.show} onHide={this.hideAndReset.bind(this, resetForm)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.toRender === INVITE_VIEW ? MyStrings.AddPartnerModal.title2 : MyStrings.AddPartnerModal.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="pb-4">
                            {this.state.success ?
                                <>
                                    <Alert variant="success">
                                        {this.props.user.partner && this.props.user.partner.name} {MyStrings.AddPartnerModal.successText}
                                    </Alert>
                                    <Button variant="info" onClick={this.hideAndReset.bind(this, resetForm)}>{MyStrings.AddPartnerModal.closeBtn}</Button>
                                </>
                                :
                                <>
                                    {this.state.toRender === UNDETERMINED_VIEW &&
                                        <Undetermined handleYes={this.handleYes} handleNo={this.handleNo} />
                                    }
                                    {this.state.toRender === ADD_FORM_VIEW &&
                                        <AddForm
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
                                        <StringsConsumer>
                                            {strings => {
                                                const userFullName = this.props.user.firstName + " " + this.props.user.lastName;
                                                return (
                                                    <Invite handleClick={() => this.handleShare(strings, userFullName)} />
                                                );
                                            }}
                                        </StringsConsumer>
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