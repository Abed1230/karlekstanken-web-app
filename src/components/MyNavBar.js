import React from 'react';
import logo from '../assets/logo.png';
import { Navbar, Button } from 'react-bootstrap';
import UserView from './UserView';
import { auth } from '../FirebaseData';
import { withRouter, Link } from 'react-router-dom';
import { UserConsumer } from '../UserContext';
import Sidebar from "react-sidebar";
import './MyNavBar.css';
import { CloseIcon, BackIcon } from '../assets/svgs';
import AboutModal from './AboutModal';
import MyStrings from '../MyStrings.json';
import { StringsConsumer } from '../contexts/StringsContext';

const mql = window.matchMedia(`(max-width: 350px)`);

class MyNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            sidebarOpen: false,
            showAboutModal: false
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    openAddPartnerModal(alsoOpenSidebar) {
        /* if (!this.state.open)
            this.toggler.click(); */

        const userView = this.userView;
        if (userView) {
            userView.openAddPartnerModal();
            if (alsoOpenSidebar)
                this.onSetSidebarOpen(true);
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
    }

    onSetSidebarOpen(open) {
        // Possible fix for disabling body scroll when sidebar is open
        /* const body = document.getElementsByTagName('body')[0];
        if (open) {
            scrollPos = window.pageYOffset;
        } 
        body.style.position = open ? "fixed" : "";

        if (!open)
            document.documentElement.scrollTop = document.body.scrollTop = scrollPos; */

        this.setState({ sidebarOpen: open });
    }

    render() {
        const { goBack, history } = this.props;
        return (
            <>
                <div className="d-print-none">
                    <Sidebar
                        sidebar={
                            <div className="p-3">
                                {auth.currentUser ?
                                    <>
                                        <div>
                                            <Button block variant="light" as={Link} to="/settings">INSTÄLLNINGAR</Button>
                                            <Button className="mt-2" block variant="danger" style={{ backgroundColor: "#FF6464", borderColor: "#FF6464" }} onClick={() => auth.signOut()}>LOGGA UT</Button>
                                            <hr />
                                        </div>
                                        <UserConsumer>
                                            {user => user ? <UserView ref={el => this.userView = el} /> : null}
                                        </UserConsumer>
                                    </>
                                    :
                                    <div>
                                        <Button block variant="info" as={Link} to="/signin">LOGGA IN</Button>
                                        <Button block variant="info" as={Link} to="/signup">SKAPA KONTO</Button>
                                    </div>
                                }
                                <div style={{ marginTop: "50px" }}>
                                    <hr />
                                    <Button className="mb-4" id="about-btn" block variant="light" onClick={() => this.setState({ showAboutModal: true })}>OM KÄRLEKSTANKEN</Button>
                                    <StringsConsumer>
                                        {strings => {
                                            const contactEmail = strings && strings.contactEmail;
                                            if (contactEmail) {
                                                return (<p>{MyStrings.contactUsText}<a href={"mailto:" + contactEmail}>{contactEmail}</a></p>);
                                            }
                                        }}
                                    </StringsConsumer>
                                    <a href={MyStrings.licenseTermsUrl} target="_blank">Användarvilkor</a>
                                    <br />
                                    <a href={MyStrings.privacyPolicyUrl} target="_blank">Personuppgiftspolicy</a>
                                    <p className="mt-3 text-muted" style={{ fontSize: "0.95rem" }}>{MyStrings.copyright}</p>
                                </div>
                            </div>
                        }
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        pullRight
                        styles={{
                            sidebar: {
                                position: "fixed",
                                width: mql.matches ? [`${window.innerWidth - 50}px`] : "300px",
                                background: "linear-gradient(to right, #ffafbd, #ffc3a0)",
                                zIndex: 3,
                                paddingTop: "70px",
                            },
                            overlay: { zIndex: 2 }
                        }}
                    >
                        <p>{/* I'm required */}</p>
                    </Sidebar>
                </div>
                <Navbar sticky="top" expand="xs" >
                    {goBack &&
                        <Button className="rounded py-1 px-2" style={{ background: "none", borderColor: "rgba(0,0,0,.1)", cursor: "pointer" }} onClick={() => history.goBack()}>
                            <BackIcon width="24" height="24" color="rgba(0, 0, 0, 0.5)" />
                        </Button>
                    }
                    <Navbar.Brand className="mx-auto" as={Link} to="/">
                        <img
                            className="logo"
                            src={logo}
                            height="35"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    {this.state.sidebarOpen ?
                        <Button className="rounded py-1 px-3" style={{ background: "none", borderColor: "rgba(0,0,0,.1)", cursor: "pointer" }} onClick={() => this.onSetSidebarOpen(false)}>
                            <CloseIcon width="24" height="24" color="rgba(0, 0, 0, 0.5)" />
                        </Button>
                        :
                        <Navbar.Toggle onClick={() => this.onSetSidebarOpen(true)} />
                    }
                </Navbar>
                <AboutModal show={this.state.showAboutModal} handleHide={() => this.setState({ showAboutModal: false })} />
            </>
        );
    }
}

export default withRouter(MyNavBar);