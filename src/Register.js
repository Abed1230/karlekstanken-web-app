import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import fire from './FirebaseData';


export class Register extends Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
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
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { email } = this.state
        const { fullName } = this.state

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
                    <p>Lösenord: {fullName}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Ditt lösenord' name='password' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <p> <Button onClick={this.signup}>Registrera</Button></p>
            </div>
        )
    }
}

export default Register