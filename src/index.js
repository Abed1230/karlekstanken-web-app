import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth, FieldValue } from './FirebaseData.js';
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

const KEY_AUTH_USER = "authUser";
const KEY_HIDE_WELCOME_MODAL = "hideWelcomeModal";

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

    // TODO: clean up this mess
    componentDidMount() {
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

        this.getStrings();
        this.getChapters();
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
                                            <PublicRoute restricted={true} component={Login} path="/signin" />
                                            <PublicRoute restricted={true} component={Register} path="/signup" />
                                            <PublicRoute restricted={true} component={ForgotPassword} path="/reset-password" />
                                            <PublicRoute restricted={false} component={HomePage} path="/" exact />
                                            <PrivateRoute component={Settings} path="/settings" exact />
                                            <PrivateRoute component={LoveTest} path="/languagetest" exact />
                                            <PublicRoute component={Chapter} path="/chapter" exact />
                                            <PublicRoute component={TaskPage} path="/task" exact />
                                            <PrivateRoute component={PurchaseSuccess} path="/purchase_success" exact />
                                            <Route component={NotFound} />
                                        </Switch>
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