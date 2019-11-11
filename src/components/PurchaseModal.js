import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';
import { createStripeCheckoutSession } from '../MyCloudFunctions';
import MyStrings from '../MyStrings.json';

class PurchaseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showNoPartnerMsg: false,
            checkoutError: null,
        };

        this.checkout = this.checkout.bind(this);
    }

    handleClick(user) {
        if (user && user.partner) {
            // Continue
            this.checkout(user);
        } else {
            this.setState({
                showNoPartnerMsg: true
            });
        }
    }

    async checkout(user) {
        this.setState({
            loading: true,
        });

        const sessionId = await createStripeCheckoutSession(
            user.uid,
            user.firstName + " " + user.lastName,
            user.email,
            user.partner.uid
        );

        if (!sessionId) {
            this.setState({
                loading: false,
                checkoutError: MyStrings.errors.unknown
            });
            return;
        }

        const stripe = window.Stripe('pk_test_lpxzB5W0JcFfnGfWFQhJubp100LUZVgWh3');

        stripe.redirectToCheckout({
            sessionId: sessionId
        }).then(function (result) {
            if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                console.log("stripe error msg: " + result.error.message);
                this.setState({ checkoutError: result.error.message });
            }
        });
    }

    render() {
        return (
            <UserConsumer>
                {user => (
                    <Modal show={this.props.show} onHide={this.props.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Lås upp kärlekstanken</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Köp licens och lås upp alla avsnitt och kärleksspråktestet. <br /> Köpet gäller för ett par (2 användare) som får tillgång till kärlekstanken med vardera konton.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="mx-auto text-center">
                                {this.state.loading ?
                                    <Spinner animation="border" style={{ color: "#6772E5" }} />
                                    :
                                    <Button disabled={this.state.showNoPartnerMsg} onClick={this.handleClick.bind(this, user)} style={{ backgroundColor: "#6772E5", color: "#FFF", padding: "8px 12px", border: "0", borderRadius: "4px", fontSize: "1em" }}
                                        id="checkout-button-sku_G9eu1VDO87OV9b"
                                        role="link">
                                        Betala med Stripe
                                    </Button>
                                }
                                {this.state.checkoutError &&
                                    <p className="text-danger mt-2" style={{ fontSize: "0.95rem" }}>{this.state.checkoutError}</p>
                                }
                                {this.state.showNoPartnerMsg &&
                                    <>
                                        <p className="text-danger mt-2" style={{ fontSize: "0.95rem" }}>Du måste först lägga till din partner</p>
                                        {/* TODO: navigate to add partern dialog */}
                                        <Button variant="outline-info" size="sm">Lägg till nu</Button>
                                    </>
                                }
                            </div>
                        </Modal.Footer>
                    </Modal>
                )}
            </UserConsumer>
        );
    }
}

export default PurchaseModal;