import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fire} from './FirebaseData.js';
import { Router, navigate } from '@reach/router'

import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                navigate ('home');
            }
            else {
                this.setState({ user: null });
                navigate ('/');
            }
        });
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <Login path='/' />
                    <Register path='/signup' />
                    <Home path='/home'  />
                </Router>
            </div>
        );
    }

}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


