import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const BackIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} width="24" height="24" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
);

function MyTitleBar({ title, history }) {
    return (
        <Navbar bg="light" sticky="top">

            <Button className="border rounded py-1 px-2" style={{ background: "none", border: "none" }} onClick={() => history.goBack()}>
                <BackIcon fill="rgba(0, 0, 0, 0.5)" />
            </Button>

            <Navbar.Brand className="ml-3 pt-0 pb-0" style={{ height: "50px" }}>
                <h5 className="h-100 d-flex align-items-center">{title}</h5>
            </Navbar.Brand>
        </Navbar>
    );
}

export default withRouter(MyTitleBar);