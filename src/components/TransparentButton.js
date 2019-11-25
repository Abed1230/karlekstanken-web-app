import React from 'react';
import { Button } from 'react-bootstrap';

function TransparentButton({ children, ...rest }) {
    return (
        <Button {...rest} children={children} style={{ padding: "0px", background: "none", border: "none" }} />
    );
}

export default TransparentButton;