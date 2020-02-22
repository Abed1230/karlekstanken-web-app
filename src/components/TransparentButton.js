import React from 'react';
import { Button } from 'react-bootstrap';

function TransparentButton({ children, styles, ...rest }) {
    return (
        <Button {...rest} children={children} style={{ ...{ padding: "0px", background: "none", border: "none", cursor: "pointer" }, ...styles }} />
    );
}

export default TransparentButton;