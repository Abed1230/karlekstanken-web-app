import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';

class PurchaseDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNoPartnerMsg: false,
            stripeCheckoutError: null,
        };

        this.checkout = this.checkout.bind(this);
    }

    handleClick(user) {
        this.checkout();
        if (user && user.parnter) {
            // Continue
            this.checkout();
        } else {
            this.setState({
                showNoPartnerMsg: true
            });
        }
    }

    checkout() {
        const stripe = window.Stripe('pk_test_lpxzB5W0JcFfnGfWFQhJubp100LUZVgWh3');

        stripe.redirectToCheckout({
            items: [{ sku: 'sku_G9eu1VDO87OV9b', quantity: 1 }],
            /* TODO: update urls when publishing */
            successUrl: 'http://localhost:3000/purchase_success',
            cancelUrl: 'http://localhost:3000',
        }).then(function (result) {
            if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                console.log(result.error.message);
                this.setState({ stripeCheckoutError: result.error.message });
            }
        });
    }

    render() {
        return (
            <UserConsumer>
                {user => (
                    <Modal show={/* this.props.show */ true} onHide={this.props.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Lås upp kärlekstanken</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Köp licens och lås upp alla avsnitt och kärleksspråktestet. <br /> Köpet gäller för ett par (2 användare) som får tillgång till kärlekstanken med vardera konton.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="mx-auto text-center">
                                <Button disabled={this.state.showNoPartnerMsg} onClick={this.handleClick.bind(this, user)} style={{ backgroundColor: "#6772E5", color: "#FFF", padding: "8px 12px", border: "0", borderRadius: "4px", fontSize: "1em" }}
                                    id="checkout-button-sku_G9eu1VDO87OV9b"
                                    role="link">
                                    Betala med Stripe
                                </Button>
                                {this.state.stripeCheckoutError &&
                                    <p className="text-danger mt-2" style={{ fontSize: "0.95rem" }}>{this.state.stripeCheckoutError}</p>
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

export default PurchaseDialog;