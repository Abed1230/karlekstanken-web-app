import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui/dist/semantic.min.css';
import Login from './Login.js';
import Register from './Register.js';
import { Router } from '@reach/router'
import * as firebase from 'firebase';

function App() {
    return (
        <div className="App">
            <Router>
                <Login path='/' />
                <Register path='/signup' />
            </Router>
        </div>
    );
}

var firebaseConfig = {
    apiKey: "AIzaSyCw1p-gKunLS72hMazyJj5wnLv7FhwOc0M",
    authDomain: "karlekstanken-3c89c.firebaseapp.com",
    databaseURL: "https://karlekstanken-3c89c.firebaseio.com",
    projectId: "karlekstanken-3c89c",
    storageBucket: "",
    messagingSenderId: "75337626405",
    appId: "1:75337626405:web:dc8f168b1263fa184e20cc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
