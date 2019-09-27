import React, { Component } from 'react'
import {fire} from './FirebaseData';
import { Button, Form } from 'semantic-ui-react';   
     

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
                <Button onClick={this.logout}>Logga ut </Button>
            </div>
        )
    }
}

export default Home
