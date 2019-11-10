import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserConsumer } from '../UserContext';

class PurchaseDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNoPartnerMsg: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(user) {
        if (user && user.parnter) {
            // Continue
        } else {
            this.setState({
                showNoPartnerMsg: true
            });
        }
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
                            <p>Köp licens och lås upp alla avsnitt och kärleksspråktestet. <br /> Köpet gäller för ett par (2 användare) som får tillgång till kärlekstanken med separata konton.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="mx-auto text-center">
                                <Button disabled={this.state.showNoPartnerMsg} onClick={this.handleClick}>Betala med kort</Button>
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