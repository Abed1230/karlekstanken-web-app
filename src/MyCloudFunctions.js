import { functions } from './FirebaseData';

export async function removePartner() {
    try {
        const removePartner = functions.httpsCallable("removePartner");
        await removePartner();
        return null;
    } catch (e) {
        console.log("removePartner error: " + e);
        return "Kunde inte ta bort din partner. Ett okänt fel inträffade. Försök igen senare";
    }
}