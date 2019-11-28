import React from 'react';
import logo from '../assets/logo.png';
import { Navbar, Dropdown, Button } from 'react-bootstrap';
import UserView from './UserView';
import { fire } from '../FirebaseData';
import { withRouter, Link } from 'react-router-dom';
import { UserConsumer } from '../UserContext';
import './MyNavBar.css';

const GearIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="22" height="22" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" /></svg>
);

const BackIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="24" height="24" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
);

class MyNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };

        this.toggler = React.createRef();

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    toggleMenu() {
        if (this.toggler)
            this.toggler.click();
    }

    openAddPartnerModal() {
        /* if (!this.state.open)
            this.toggler.click(); */

        const userView = this.userView;
        if (userView) {
            userView.openAddPartnerModal();
        }
    }

    handleToggleClick() {
        const isOpen = this.state.isOpen;
        if (!isOpen) {
            // Menu is closed now. It will be open so add listener
            document.addEventListener('click', this.handleDocumentClick, true);

            // Hides unlock message on small screens
            const unlockMsgElement = document.getElementById("unlock-msg");
            if (unlockMsgElement) {
                unlockMsgElement.classList.remove("d-flex");
                unlockMsgElement.classList.add("d-none", "d-md-flex");
            }
                
        } else {
            // Menu is open. It will be closed so remove listener
            document.removeEventListener('click', this.handleDocumentClick, true);

            const unlockMsgElement = document.getElementById("unlock-msg");
            if (unlockMsgElement) {
                unlockMsgElement.classList.remove("d-none", "d-md-flex");
                unlockMsgElement.classList.add("d-flex");
            }
        }

        this.setState({ isOpen: !isOpen });
    }

    handleDocumentClick(e) {
        const modal = document.querySelector('[role="dialog"]');
        const container = this._element;
        if (!modal && e.target !== container && !container.contains(e.target)) {
            this.toggleMenu();
        }
    }

    // We need to set ref this way beacuse this component is using HOC (withRouter)
    componentDidMount() {
        const onRef = this.props.onRef;
        if (onRef)
            onRef(this);
    }

    componentWillUnmount() {
        const onRef = this.props.onRef;
        if (onRef)
            onRef(undefined);

        document.removeEventListener('click', this.handleDocumentClick, true);
    }

    render() {
        const { goBack, history } = this.props;
        return (
            <div ref={(el) => this._element = el}>
                <Navbar bg="light" sticky="top" expand="xs">
                    {goBack &&
                        <Button className="border rounded py-1 px-2" style={{ background: "none", border: "none" }} onClick={() => history.goBack()}>
                            <BackIcon fill="rgba(0, 0, 0, 0.5)" />
                        </Button>
                    }
                    <Navbar.Brand className="mx-auto">
                        <img
                            className="logo"
                            src={logo}
                            height="35"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle ref={el => this.toggler = el} onClick={this.handleToggleClick} aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Dropdown.Divider />
                        <UserConsumer>
                            {user => user ? <UserView ref={el => this.userView = el} /> : null}
                        </UserConsumer>
                        <Dropdown.Divider className="mt-4 mb-4" />
                        {/* TODO: navigate to settings page */}
                        <Button className="float-left d-flex align-items-center" variant="outline-secondary" as={Link} to="/settings">
                            <span className="mr-1"><GearIcon fill="#6c757d" /></span>
                            Inställningar
                    </Button>
                        <Button className="float-right" variant="outline-danger" onClick={() => fire.auth().signOut()}>Logga ut</Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(MyNavBar);