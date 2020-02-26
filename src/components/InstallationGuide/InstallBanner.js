import React from 'react';
import TransparentButton from '../TransparentButton';
import { CloseIcon } from '../../assets/svgs';
import MyStrings from '../../MyStrings.js';
import Icon from '../../assets/icon192.png';
import './InstallBanner.css';

const InstallBanner = ({ handleClick, handleClose }) => (
    <div id="install-banner" className="pt-2 pb-2 pl-3 pr-3" onClick={handleClick}>
        <div className="d-flex align-items-center">
            <img
                src={Icon}
                height={26}
                width={26}
                alt="Icon" />
            <h6 className="ml-3 mr-3 my-auto">{MyStrings.InstallBanner.text}</h6>
            <TransparentButton  className="ml-auto" onClick={handleClose}>
                <CloseIcon width="16" height="16" color="#000" />
            </TransparentButton>
        </div>
    </div>
);

export default InstallBanner;
