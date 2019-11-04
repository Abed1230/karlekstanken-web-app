import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth } from './FirebaseData.js';
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
import TaskPage from './TaskPage';
import Settings from './components/Settings';

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

                    /* only read once at start */
                    if (!this.state.user) {
                        /* TODO: check expiry here  */
                        const premiumSnap = await db.collection("users_premium_status").doc(authUser.uid).get();
                        const premium = premiumSnap.data();

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
                            <BrowserRouter>
                                <Switch>
                                    <PublicRoute restricted={true} component={Login} path="/signin" exact />
                                    <PublicRoute restricted={true} component={Register} path="/signup" exact />
                                    <PrivateRoute component={HomePage} path="/" exact />
                                    <PrivateRoute component={Settings} path="/settings" exact />
                                    <PrivateRoute component={LoveTest} path="/languagetest" exact />
                                    <PrivateRoute component={Chapter} path="/chapter" exact />
                                    <PrivateRoute component={TaskPage} path="/task" exact />
                                    <Route component={NotFound} />
                                </Switch>
                            </BrowserRouter>
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


