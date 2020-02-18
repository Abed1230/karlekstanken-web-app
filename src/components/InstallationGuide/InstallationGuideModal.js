import React from 'react';
import { Modal } from 'react-bootstrap';
import SafariIcon from '../../assets/safari.svg';
import IosShareIcon from '../../assets/ios_share_icon.svg';
import ChromeIcon from '../../assets/chrome.svg';
import ChromeMoreIcon from '../../assets/more_vert-24px.svg';
import CircleAdd from '../../assets/cricular_add.svg';
import MyStrings from '../../MyStrings.js';

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

const isAndroid = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf("android") > -1;
}

const InstallationGuideModal = ({ show, handleHide }) => {
    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                {isIos() ?
                    <IOSInstructions />
                    :
                    isAndroid() ?
                        <AndroidInstructions />
                        :
                        <OtherInstructions />
                }
            </Modal.Body>
        </Modal>
    );
}

const IOSInstructions = () => (
    <>
        <span>{MyStrings.InstallationGuideModal.youCanInstallWith} </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={SafariIcon} width={24} height={24} alt="Safari Icon" className="mr-1" />
            Safari
        </div>
        <div className="mt-3">
            <p>{MyStrings.InstallationGuideModal.doLikeThis}</p>
            <ol>
                <li>{MyStrings.InstallationGuideModal.press} <img src={IosShareIcon} width={32} height={32} alt="iOS Share Button Icon" /> {MyStrings.InstallationGuideModal.iOSInstructions.step1}</li>
                <li>{MyStrings.InstallationGuideModal.iOSInstructions.step2}</li>
                <li>{MyStrings.InstallationGuideModal.iOSInstructions.step3}</li>
            </ol>
            <p className="text-muted">{MyStrings.InstallationGuideModal.notice}</p>
        </div>
    </>
);

const AndroidInstructions = () => (
    <>
        <span>{MyStrings.InstallationGuideModal.youCanInstallWith} </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={ChromeIcon} width={24} height={24} alt="Chrome Icon" className="mr-1" />
            Google Chrome
        </div>
        <div className="mt-3">
            <p>{MyStrings.InstallationGuideModal.doLikeThis}</p>
            <ol>
                <li>{MyStrings.InstallationGuideModal.press} <img src={ChromeMoreIcon} width={24} height={24} alt="Chrome More Button Icon" /> {MyStrings.InstallationGuideModal.androidInstructions.step1}</li>
                <li>{MyStrings.InstallationGuideModal.androidInstructions.step2}</li>
                <li>{MyStrings.InstallationGuideModal.androidInstructions.step3}</li>
            </ol>
            <p className="text-muted">{MyStrings.InstallationGuideModal.notice}</p>
        </div>
    </>
);

const OtherInstructions = () => (
    <>
        <span>{MyStrings.InstallationGuideModal.youCanInstallWith} </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={ChromeIcon} width={24} height={24} alt="Chrome Icon" className="mr-1" />
            Google Chrome
        </div>
        <div className="mt-3">
            <p>{MyStrings.InstallationGuideModal.doLikeThis}</p>
            <ol>
                <li>{MyStrings.InstallationGuideModal.press} <img src={CircleAdd} width={24} height={24} alt="Chrome Install/Add Button Icon" /> {MyStrings.InstallationGuideModal.otherInstructions.step1}</li>
                <li>{MyStrings.InstallationGuideModal.otherInstructions.step2}</li>
            </ol>
            <p className="text-muted">{MyStrings.InstallationGuideModal.notice}</p>
        </div>
    </>
);

export default InstallationGuideModal;