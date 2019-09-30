import React, { Component } from 'react';
import {fire,db} from './FirebaseData.js'; 


export class Register extends Component {
    constructor(props) {
        super(props)


        this.handleInputchange = this.handleInputchange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleInputchange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.addUserToDocument();
        }).catch((error) => {
            console.log(error);
        });
    }

    addUserToDocument() {
        // Add a new document in collection "users"
        db.collection("users").doc().set({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
    }

    render() {
        const { email } = this.state
        const {password} = this.state
        const { firstName } = this.state
        const { lastName } = this.state

        return (
            <div>
                <h1>Registrera</h1>

                <div>
                    <p>Email: {email}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Din email' name='email' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div>
                    <p>Lösenord: {password}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Ditt lösenord' name='password' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div>
                    <p>Förnamn: {firstName}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Ditt förnamn' name='firstName' onChange={this.handleInputchange} /></p>
                    </form>
                </div>


                <div>
                    <p>Efternamn: {lastName}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Ditt efternamn' name='lastName' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <p> <button type="button" onClick={this.signup}>Registrera</button></p>
            </div>
        )
    }
}

export default Register