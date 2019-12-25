import React from 'react';
import { Card } from 'react-bootstrap';

function RoundedCard({ children }) {
    return (
        <Card style={{ borderRadius: "10px", border: "none" }}>
            {children}
        </Card>
    );
};

export default RoundedCard;