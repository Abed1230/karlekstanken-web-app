import React from 'react';
import { Modal } from 'react-bootstrap';
import SafariIcon from '../../assets/safari.svg';
import IosShareIcon from '../../assets/ios_share_icon.svg';

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

const isAndroid = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf("android") > -1;
}

const InstallationGuideModal = () => {
    return (
        <Modal show={true} onHide={() => { }}>
            <Modal.Header closeButton>
                {/* <Modal.Title>
                    Instruktioner för att lägg till på hemskärmen
                </Modal.Title> */}
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
        <span>Du kan installera Kärlekstanken på din hemskärm med webbläsaren </span>
        <div className="d-inline-block bg-light p-1 rounded">
            <img src={SafariIcon} width={32} height={32} className="mr-1" />
            Safari
        </div>
        <div className="mt-3">
            <p>Gör så här:</p>
            <ol>
                <li>Tryck på <img src={IosShareIcon} width={32} height={32} /> (dela) som finns i webbläsarens botten eller topp</li>
                <li>Välj "Lägg till på hemskärmen"</li>
            </ol>
            <p className="text-muted">Notera: Du kommer att behöva logga in på nytt när du startar appen från hemskärmen för första gången.</p>
        </div>
    </>
);

const AndroidInstructions = () => ("is Android");

const OtherInstructions = () => ("is windows or mac");

export default InstallationGuideModal;