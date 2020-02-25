import React from 'react';
import './PurchaseBanner.css';
import MyStrings from '../../MyStrings.js';

const PurchaseBanner = ({ handleClick }) => (
    <div id="purchase-banner" className="fixed-bottom p-2 bg-info text-white align-items-center" style={{ cursor: "pointer" }} onClick={handleClick}>
        <div className="text-center mx-auto">
            <span className="mx-auto ml-4">{MyStrings.PurchaseBanner.text}</span>
            <br />
            <span><strong>{MyStrings.PurchaseBanner.btn}</strong></span>
        </div>
    </div >
);

export default PurchaseBanner;