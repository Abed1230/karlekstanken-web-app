import React, { Component } from 'react'
import {fire} from './FirebaseData';   

export class Home extends Component {

    constructor(props)
    {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        fire.auth().signOut();
    }
     
    render() {
        return (
            <div>
                <h1>You are home</h1>
                <button type="button" onClick={this.logout}>Logga ut </button>
            </div>
        )
    }
}

export default Home
