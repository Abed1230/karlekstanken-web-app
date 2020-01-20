export const isInStandaloneMode = () => {
    if (('standalone' in window.navigator) && (window.navigator.standalone)) { // iOS
        return true;
    } else if (window.matchMedia('(display-mode: standalone)').matches) { // Android
        return true;
    }
    return false;
};