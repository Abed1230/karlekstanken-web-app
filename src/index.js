import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth, FieldValue, analytics } from './FirebaseData.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './CustomRoutes';
import { UserProvider } from './UserContext';
import { AuthUserProvider } from './contexts/AuthUserContext';
import { CoupleDataProvider } from './CoupleDataContext';

import HomePage from './components/HomePage.js';
import LoveTest from './LoveTest';
import NotFound from './components/NotFound';
import Chapter from './components/Chapter';
import TaskPage from './components/Task/TaskPage';
import Settings from './components/Settings/Settings.js';
import PurchaseSuccess from './components/PurchaseSuccess';
import { ChaptersProvider } from './contexts/ChaptersContext';
import { StringsProvider } from './contexts/StringsContext';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword';
import WelcomeModal from './components/WelcomeModal';
import { isInStandaloneMode } from './UtilFunctions';
import AnalyticsPageViewLogger from './AnalyticsPageViewLogger.js';
import MyStrings from './MyStrings';

const KEY_AUTH_USER = "authUser";
const KEY_HIDE_WELCOME_MODAL = "hideWelcomeModal";

const DEFAULT_FIREBASE_HOST = "karlekstanken-3c89c.web.app";
const DEFAULT_FIREBASE_HOST_2 = "karlekstanken-3c89c.firebaseapp.com";
const APP_URL = "https://app.karlekstanken.se";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            coupleData: null,
            authUser: JSON.parse(localStorage.getItem(KEY_AUTH_USER)),
            showWelcomeModal: !localStorage.getItem(KEY_HIDE_WELCOME_MODAL),
        }
    }

    componentDidMount() {
        // If user tries to open one of the default non deleteable firebase hosting domains we redirect to our custom domain
        if (window.location.host === DEFAULT_FIREBASE_HOST || window.location.host === DEFAULT_FIREBASE_HOST_2) {
            window.location.replace(APP_URL);
        }

        analytics.logEvent('page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });

        this.subOnAuthStateChanged();
        this.getStrings();
        this.getChapters();
    }

    subOnAuthStateChanged() {
        // TODO: clean up this mess
        this.unsubAuthUser = auth.onAuthStateChanged((authUser) => {
            // makes sure we only have one subscription
            this.unsubUserData && this.unsubUserData();
            this.unsubCoupleData && this.unsubCoupleData();

            if (authUser) {
                localStorage.setItem(KEY_AUTH_USER, JSON.stringify(authUser));
                this.setState({ authUser: authUser });

                this.unsubUserData = db.collection("users").doc(authUser.uid).onSnapshot(async (snap) => {
                    const user = snap.data();

                    if (!user) {
                        return;
                    }

                    user.uid = authUser.uid;

                    const coupleDataRef = user.coupleDataRef;
                    if (coupleDataRef) {
                        this.unsubCoupleData = coupleDataRef.onSnapshot((snap) => {
                            this.setState({
                                coupleData: snap.data()
                            });
                        });
                    }

                    // Only get premium status once on component mount 
                    if (!this.state.user) {
                        user.premium = await this.getPremiumStatus(authUser, false);
                    } else {
                        // We already have premium status
                        const premium = this.state.user.premium;
                        user.premium = premium;
                    }

                    // Premium has been purchased. Get new premium status object
                    if (user.shouldRefreshIdToken) {
                        db.collection("users").doc(authUser.uid).update({ shouldRefreshIdToken: FieldValue.delete() });
                        user.premium = await this.getPremiumStatus(authUser, true);
                    }

                    this.setState({
                        user: user
                    });
                });
            } else {
                localStorage.removeItem(KEY_AUTH_USER);
                this.setState({ authUser: null, coupleData: null, user: null });
            }
        });
    }

    async getPremiumStatus(authUser, refresh) {
        try {
            const idTokenResult = await authUser.getIdTokenResult(refresh);
            const premium = idTokenResult.claims.premium;
            if (premium) {
                return premium;
            }
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getChapters() {
        const snap = await db.collection("chapters").doc("portals").get();
        const doc = snap.data();

        if (!doc) return;

        const chaps = doc.list;
        chaps && chaps.sort((a, b) => a.subHead.localeCompare(b.subHead, undefined, { numeric: true, sensitivity: 'base' }));

        this.setState({
            chapters: chaps
        });
    }

    async getStrings() {
        const snap = await db.collection('other').doc('strings').get();
        const doc = snap.data();

        this.setState({
            strings: doc
        });
    }

    hideWelcomeModal() {
        localStorage.setItem(KEY_HIDE_WELCOME_MODAL, true);
        // in ios content behind modal scrolls as well, so we reset scroll position
        window.scroll(0, 0);
        this.setState({ showWelcomeModal: false });
    }

    componentWillUnmount() {
        this.unsubAuthUser && this.unsubAuthUser();
        this.unsubUserData && this.unsubUserData();
        this.unsubCoupleData && this.unsubCoupleData();
    }

    render() {
        const showWelcomeModal = this.state.showWelcomeModal && !isInStandaloneMode();
        return (
            <div className="App">
                <AuthUserProvider value={this.state.authUser}>
                    <UserProvider value={this.state.user}>
                        <CoupleDataProvider value={this.state.coupleData}>
                            <ChaptersProvider value={this.state.chapters}>
                                <StringsProvider value={this.state.strings}>
                                    <BrowserRouter>
                                        <Switch>
                                            <PublicRoute restricted={true} component={Login} title={MyStrings.signInTitle} path="/signin" exact />
                                            <PublicRoute restricted={true} component={Register} title={MyStrings.signUpTitle} path="/signup" exact />
                                            <PublicRoute restricted={false} component={Register} title={MyStrings.signUpTitle} path="/signup/:partnerUID" exact />
                                            <PublicRoute restricted={true} component={ForgotPassword} title={MyStrings.forgotPasswordTitle} path="/reset-password" exact />
                                            <PublicRoute restricted={false} component={HomePage} title={MyStrings.homeTitle} path="/" exact />
                                            <PrivateRoute component={Settings} path="/settings" title={MyStrings.settingsTitle} exact />
                                            <PrivateRoute component={LoveTest} title={MyStrings.languageTestTitle} path="/languagetest" exact />
                                            <PublicRoute component={Chapter} path="/chapter" exact />
                                            <PublicRoute component={TaskPage} path="/task" exact />
                                            <PrivateRoute component={PurchaseSuccess} title={MyStrings.appName} path="/purchase_success" exact />
                                            <Route component={NotFound} />
                                        </Switch>
                                        <AnalyticsPageViewLogger />
                                    </BrowserRouter>
                                    <WelcomeModal show={showWelcomeModal} handleHide={() => (this.hideWelcomeModal())} />
                                </StringsProvider>
                            </ChaptersProvider>
                        </CoupleDataProvider>
                    </UserProvider>
                </AuthUserProvider>
            </div >
        );
    }

}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();