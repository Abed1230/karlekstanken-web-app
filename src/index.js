import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fire, db, auth } from './FirebaseData.js';
import { Router, navigate } from '@reach/router'

import Login from './Login.js';
import Register from './Register.js';
import HomePage from './components/HomePage.js';


export const UserContext = React.createContext();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authUser: null
        }
    }

    componentDidMount() {
        this.unsubAuthUser = auth.onAuthStateChanged((authUser) => {
            console.log("authUser: " + authUser);
            // makes sure we have only one subscription
            this.unsubUserData && this.unsubUserData();

            if (authUser) {
                this.setState({
                    authUser: authUser
                })
                
                this.unsubUserData = db.collection("users").doc(authUser.uid).onSnapshot((snap) => {
                    const user = snap.data();
                    user.uid = authUser.uid;
                    this.setState({
                        user: user
                    });
                });

                navigate("/home");
            } else {
                this.setState({
                    authUser: authUser
                });
                navigate("/");
            }
        });
    }

    componentWillUnmount() {
        this.unsubAuthUser && this.unsubAuthUser();
        this.unsubUserData && this.unsubUserData();
    }

    render() {
        return (
            <div className="App">
                <UserContext.Provider value={this.state.user}>
                    <Router>
                        <Login path='/' />
                        <Register path='/signup' />
                        <HomePage path='/home' />
                        <Hello path="/hello" />
                    </Router>
                </UserContext.Provider>
            </div >
        );
    }

}

const Hello = () => (<h1>Hello Page</h1>);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


