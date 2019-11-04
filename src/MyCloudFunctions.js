import { functions } from './FirebaseData';

//const ERROR_INTERNAL = 'ERROR_INTERNAL';
const ERROR_USER_NOT_FOUND = 'ERROR_USER_NOT_FOUND';
const ERROR_RECEIVER_ALREADY_HAS_PARTNER = 'ERROR_RECEIVER_ALREADY_HAS_PARTNER';
const ERROR_RECEIVER_HAS_PENDING_REQUEST = 'ERROR_RECEIVER_HAS_PENDING_REQUEST';
const ERROR_RECEIVER_EMAIL_REQUIRED = 'ERROR_RECEIVER_EMAIL_REQUIRED';
const ERROR_RECEIVER_EMAIL_IS_SENDERS = 'ERROR_RECEIVER_EMAIL_IS_SENDERS';




export async function rejectPartnerRequest()
{
    try {
        var rejectPartnerRequest = functions.httpsCallable('rejectPartnerRequest');
        await rejectPartnerRequest();
        console.log('worked fine');
    }
    catch(e)
    {
        console.log(e.message); 
    }
}

export async function acceptPartnerRequest()
{
    try {
        var acceptPartnerRequest = functions.httpsCallable('acceptPartnerRequest');
        await acceptPartnerRequest();
        console.log('worked fine');
    }
    catch(e)
    {
        console.log(e.message); 
    }
}

export async function cancelPartnerRequest()
{
    try {
        var cancelPartnerRequest = functions.httpsCallable('cancelPartnerRequest');
        await cancelPartnerRequest();
        console.log('worked fine');
    }
    catch(e)
    {
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