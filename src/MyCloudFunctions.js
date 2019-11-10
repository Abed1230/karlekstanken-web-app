import { functions } from './FirebaseData';

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