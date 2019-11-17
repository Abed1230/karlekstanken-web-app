import React from 'react';
import './PrintTask.css';
import logo from '../../logo.png';
import logoAlt from '../../assets/logo_alt.png';
import timeIcon from '../../assets/time.svg';

const PrintTask = ({ task }) => (
    <div className="d-none d-print-block">
        <div>
            <div className="column-left text-left">
                <img
                    src={logo}
                    height="35"
                    alt="Logo"
                />
            </div>
            <div className="column-center text-center">
                <img
                    src={logoAlt}
                    height="65"
                    alt="Logo"
                />
            </div>
            <div className="column-right text-right">
                <div className="d-inline-block text-center">
                    <img
                        src={timeIcon}
                        height="65"
                        alt="Time"
                    />
                    <br />
                    <span>{task.time}</span>
                </div>
            </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: task.bodyHTML }} />
    </div>

);

export default PrintTask;