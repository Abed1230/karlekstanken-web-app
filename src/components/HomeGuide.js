import React from 'react';
import MyStrings from '../MyStrings';

const UppArrow = ({ color }) => (
    <div style={{
        transform: "rotate(180deg)"
    }}>
        <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path fill={color} d="m32 8c-1.104 0-2 .896-2 2v39.899l-14.552-15.278c-.761-.799-2.026-.832-2.828-.069-.8.762-.831 2.027-.069 2.827l16.62 17.449c.756.756 1.76 1.172 2.829 1.172 1.068 0 2.073-.416 2.862-1.207l16.586-17.414c.762-.8.73-2.065-.069-2.827-.799-.763-2.065-.731-2.827.069l-14.552 15.342v-39.963c0-1.104-.896-2-2-2z" /></svg>
    </div>
);

const HomeGuide = ({ top, left, width, height, handleClick }) => (
    <div onClick={handleClick} style={{
        cursor: "pointer",
        zIndex: "99999",
        position: "fixed",
        top: "0px",
        bottom: "0px",
        height: "100%",
        width: "100%"
    }}>
        <div id="asd" style={{
            zIndex: "999999",
            position: "fixed",
            height: `${height}px`,
            width: `${width}px`,
            top: `${top}px`,
            left: `${left}px`,
            outline: "9999px solid rgba(50, 50, 50, 0.7)"
        }} />
        <div data-tag="chapter"
            className="text-center"
            style={{
                zIndex: "999999",
                position: "fixed",
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                paddingTop: `${height + 10}px`
            }}>
            <div style={{
                padding: "5px",
                background: "#ffafbd"
            }}>
                <UppArrow color="#000" />
                <h6 style={{ color: "#000" }}>{MyStrings.homeGuideText}</h6>
            </div>
        </div>
    </div>
);

export default HomeGuide;