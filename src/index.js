import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth, ServerTimestamp } from './FirebaseData.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './CustomRoutes';
import { UserProvider } from './UserContext';
import { AuthUserProvider } from './AuthUserContext';
import { CoupleDataProvider } from './CoupleDataContext';

import Login from './Login.js';
import Register from './Register.js';
import HomePage from './components/HomePage.js';
import LoveTest from './LoveTest';
import NotFound from './components/NotFound';
import Chapter from './components/Chapter';
import TaskPage from './components/Task/TaskPage';
import Settings from './components/Settings/Settings.js';
import PurchaseSuccess from './components/PurchaseSuccess';
import Authentication from './components/Authentication/Authentication';
import { revokePremium } from './MyCloudFunctions';
import { ChaptersProvider } from './contexts/ChaptersContext';
import SignIn from './components/Authentication/SignIn';

const KEY_AUTH_USER = "authUser";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            coupleData: null,
            authUser: JSON.parse(localStorage.getItem(KEY_AUTH_USER)),
        }
    }

    async checkPremiumExpiry(premium, userUid, partnerUid) {
        const expiry = premium.expiry.toDate();
        const now = ServerTimestamp.now().toDate();

        console.log("expiry: " + expiry.toString());
        console.log("now: " + now.toString());
        if (expiry <= now) {
            console.log("premium expired... revoking now");
            const success = await revokePremium(userUid, partnerUid);
            // Call this to update premium status on the user object in state
            // Important: only call this function on success, otherwise we may end up 
            // calling cloud function multiple times 
            if (success)
                this.getPremiumStatus();
        }
    }

    // TODO: clean up this mess
    componentDidMount() {
        this.unsubAuthUser = auth.onAuthStateChanged((authUser) => {
            console.log("auth state changed, authUser: " + authUser);
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

                    // Only fetch premium status once on component mount 
                    if (!this.state.user) {
                        await this.getPremiumStatus(user);
                    }
                    // We already have premium status
                    if (this.state.user) {
                        const premium = this.state.user.premium;
                        user.premium = premium;
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

        this.getChapters();
    }

    async getPremiumStatus(pUser) {
        const user = pUser ? pUser : this.state.user;

        const premiumSnap = await db.collection("users_premium_status").doc(user.uid).get();
        const premium = premiumSnap.data();

        if (premium)
            this.checkPremiumExpiry(premium, user.uid, user.partner.uid);

        user.premium = premium;

        this.setState({ user: user });
    }

    async getChapters() {
        const snap = await db.collection("chapters").doc("portals").get();
        const doc = snap.data();

        this.setState({
            chapters: doc.list
        });
    }

    componentWillUnmount() {
        this.unsubAuthUser && this.unsubAuthUser();
        this.unsubUserData && this.unsubUserData();
        this.unsubCoupleData && this.unsubCoupleData();
    }

    render() {
        return (
            <div className="App">
                <AuthUserProvider value={this.state.authUser}>
                    <UserProvider value={this.state.user}>
                        <CoupleDataProvider value={this.state.coupleData}>
                            <ChaptersProvider value={this.state.chapters}>
                                <BrowserRouter>
                                    <Switch>
                                        <PublicRoute restricted={false} component={Authentication} path="/auth" exact />
                                        <PublicRoute restricted={false} component={SignIn} path="/auth/signin" exact />
                                        <PublicRoute restricted={true} component={Login} path="/signin" exact />
                                        <PublicRoute restricted={true} component={Register} path="/signup" exact />
                                        <PrivateRoute component={HomePage} path="/" exact />
                                        <PrivateRoute component={Settings} path="/settings" exact />
                                        <PrivateRoute component={LoveTest} path="/languagetest" exact />
                                        <PrivateRoute component={Chapter} path="/chapter" exact />
                                        <PrivateRoute component={TaskPage} path="/task" exact />
                                        <PrivateRoute component={PurchaseSuccess} path="/purchase_success" exact />
                                        <Route component={NotFound} />
                                    </Switch>
                                </BrowserRouter>
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
serviceWorker.unregister();


