import React from 'react';
import logo from '../assets/logo.png';
import { Navbar, Dropdown, Button } from 'react-bootstrap';
import UserView from './UserView';
import { auth } from '../FirebaseData';
import { withRouter, Link } from 'react-router-dom';
import { UserConsumer } from '../UserContext';
import Sidebar from "react-sidebar";
import './MyNavBar.css';
import { CloseIcon, BackIcon } from '../assets/svgs';

const GearIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="22" height="22" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" /></svg>
);

const mql = window.matchMedia(`(max-width: 350px)`);

class MyNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            sidebarOpen: false,
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    openAddPartnerModal() {
        /* if (!this.state.open)
            this.toggler.click(); */

        const userView = this.userView;
        if (userView) {
            userView.openAddPartnerModal();
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
                                    <Button block variant="info" as={Link} to="/auth/signin">LOGGA IN</Button>
                                    <Button block variant="info" as={Link} to="/auth/signup">SKAPA KONTO</Button>
                                </div>
                            }
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
                            zIndex: 3, paddingTop: "70px"
                        },
                        overlay: { zIndex: 2 }
                    }}
                >
                    <p>{/* I'm required */}</p>
                </Sidebar>
                <Navbar bg="light" sticky="top" expand="xs" >
                    {goBack &&
                        <Button className="border rounded py-1 px-2" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => history.goBack()}>
                            <BackIcon width="24" height="24" color="rgba(0, 0, 0, 0.5)" />
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
                    {this.state.sidebarOpen ?
                        <Button className="border rounded py-1 px-3" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => this.onSetSidebarOpen(false)}>
                            <CloseIcon width="24" height="24" color="rgba(0, 0, 0, 0.5)" />
                        </Button>
                        :
                        <Navbar.Toggle onClick={() => this.onSetSidebarOpen(true)} />
                    }
                </Navbar>
            </>
        );
    }
}

export default withRouter(MyNavBar);