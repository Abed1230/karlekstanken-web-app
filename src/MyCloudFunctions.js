import { functions } from './FirebaseData';

//const ERROR_INTERNAL = 'ERROR_INTERNAL';
const ERROR_USER_NOT_FOUND = 'ERROR_USER_NOT_FOUND';
const ERROR_RECEIVER_ALREADY_HAS_PARTNER = 'ERROR_RECEIVER_ALREADY_HAS_PARTNER';
const ERROR_RECEIVER_HAS_PENDING_REQUEST = 'ERROR_RECEIVER_HAS_PENDING_REQUEST';
const ERROR_RECEIVER_EMAIL_REQUIRED = 'ERROR_RECEIVER_EMAIL_REQUIRED';
const ERROR_RECEIVER_EMAIL_IS_SENDERS = 'ERROR_RECEIVER_EMAIL_IS_SENDERS';

export async function rejectPartnerRequest() {
    try {
        var rejectPartnerRequest = functions.httpsCallable('rejectPartnerRequest');
        await rejectPartnerRequest();
        console.log('worked fine');
    }
    catch (e) {
        console.log(e.message);
    }
}

export async function acceptPartnerRequest() {
    try {
        var acceptPartnerRequest = functions.httpsCallable('acceptPartnerRequest');
        await acceptPartnerRequest();
        console.log('worked fine');
    }
    catch (e) {
        console.log(e.message);
    }
}

export async function cancelPartnerRequest() {
    try {
        var cancelPartnerRequest = functions.httpsCallable('cancelPartnerRequest');
        await cancelPartnerRequest();
        console.log('worked fine');
    }
    catch (e) {
        console.log(e.message);
    }
}

export async function sendPartnerRequest(email) {
    try {
        var sendPartnerRequest = functions.httpsCallable('sendPartnerRequest');
        await sendPartnerRequest({ email: email });
        console.log("Request sent");
    }
    catch (e) {
        console.log(e.message);
        switch (e.message) {
            default:
                {
                    return 'Ett okänt fel inträffade.'
                }

            case ERROR_USER_NOT_FOUND:
                {
                    return 'Ingen användare med denna email adress existerar.'
                }


            case ERROR_RECEIVER_ALREADY_HAS_PARTNER:
                {
                    return 'Användaren har redan en partner.'
                }


            case ERROR_RECEIVER_HAS_PENDING_REQUEST:
                {
                    return 'Användaren har redan en partner förfrågan.'
                }


            case ERROR_RECEIVER_EMAIL_REQUIRED:
                {
                    return 'Du har inte skrivit in en giltig email adress.'
                }

            case ERROR_RECEIVER_EMAIL_IS_SENDERS:
                {
                    return 'Du kan inte lägga till dig själv, vännen.'
                }
        }
    }
}

export async function removePartner() {
    try {
        const removePartner = functions.httpsCallable("removePartner");
        await removePartner();
        return null;
    } catch (e) {
        console.log("removePartner error: " + e);
        return "Kunde inte ta bort din partner. Ett okänt fel inträffade. Var god försök igen senare";
    }
}

export async function deleteAccount() {
    try {
        const deleteAccount = functions.httpsCallable("deleteAccount");
        await deleteAccount();
        return null;
    } catch (e) {
        console.log("delete account error: " + e);
        if (e.code.startsWith("auth")) {
            return "Ett okänt fel inträffade och ditt konto har inte blivit fullständigt borttagen. Var god försök igen senare för att avsluta ditt konto fullständigt"
        }
        return "Ett okänt fel inträffade. Var god försök igen senare";
    }
}

export async function createStripeCheckoutSession(uid, name, email, partnerUid) {
    try {
        const createStripeCheckoutSession = functions.httpsCallable("createStripeCheckoutSession");
        const result = await createStripeCheckoutSession(
            {
                user: {
                    uid: uid,
                    name: name,
                    email: email,
                    partnerUid: partnerUid
                }
            });
        console.log(result);
        const sessionId = result && result.data && result.data.sessionId;
        return sessionId;
    } catch (e) {
        console.log(e);
    }
}

export async function revokePremium(userUid, partnerUid) {
    try {
        const revokePremium = functions.httpsCallable("revokePremium");
        await revokePremium({ userUid: userUid, partnerUid: partnerUid });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}