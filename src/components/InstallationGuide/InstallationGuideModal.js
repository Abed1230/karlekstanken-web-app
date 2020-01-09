import React from 'react';
import { Modal } from 'react-bootstrap';
import SafariIcon from '../../assets/safari.svg';
import IosShareIcon from '../../assets/ios_share_icon.svg';
import ChromeIcon from '../../assets/chrome.svg';
import ChromeMoreIcon from '../../assets/more_vert-24px.svg';
import CircleAdd from '../../assets/cricular_add.svg';

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

const notice = "Notera: Du kan komma att behöva logga in på nytt när du startar appen från hemskärmen för första gången.";

const IOSInstructions = () => (
    <>
        <span>Du kan installera Kärlekstanken på din hemskärm med webbläsaren </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={SafariIcon} width={24} height={24} className="mr-1" />
            Safari
        </div>
        <div className="mt-3">
            <p>Gör så här:</p>
            <ol>
                <li>Tryck på <img src={IosShareIcon} width={32} height={32} /> (dela) som finns i webbläsarens botten eller topp</li>
                <li>Välj "Lägg till på hemskärmen"</li>
                <li>Lägg till</li>
            </ol>
            <p className="text-muted">{notice}</p>
        </div>
    </>
);

const AndroidInstructions = () => (
    <>
        <span>Du kan installera Kärlekstanken på din hemskärm med webbläsaren </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={ChromeIcon} width={24} height={24} className="mr-1" />
            Google Chrome
        </div>
        <div className="mt-3">
            <p>Gör så här:</p>
            <ol>
                <li>Tryck på <img src={ChromeMoreIcon} width={24} height={24} /> som finns i webbläsarens topp</li>
                <li>Välj "Lägg till på startskärmen"</li>
                <li>Lägg till</li>
            </ol>
            <p className="text-muted">{notice}</p>
        </div>
    </>
);

const OtherInstructions = () => (
    <>
        <span>Du kan installera Kärlekstanken på din hemskärm med webbläsaren </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={ChromeIcon} width={24} height={24} className="mr-1" />
            Google Chrome
        </div>
        <div className="mt-3">
            <p>Gör så här:</p>
            <ol>
                <li>Tryck på <img src={CircleAdd} width={24} height={24} /> som finns i webbläsarens högra sida av addressfältet, bredvid bokmärk symbolen.</li>
                <li>Installera</li>
            </ol>
            <p className="text-muted">{notice}</p>
        </div>
    </>
);

export default InstallationGuideModal;