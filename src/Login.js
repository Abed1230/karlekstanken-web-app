import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleInputchange = (event) => {
        event.preventDefault()
        //console.log(event)
        //console.log(event.target.name)
        //console.log(event.target.value)

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /* componentDidMount(){
         this.setState({
             fullName: "Erke"
         })
     }*/

    render() {
        const { email } = this.state
        const { password } = this.state

        return (
            <div>
                <h1>Logga in</h1>
                <div>
                    <p>Email: {email}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='your name' name='email' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div>
                    <p>Lösenord: {password}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='your name' name='password' onChange={this.handleInputchange} /></p>
                    </form>
                </div>
                <p> <Button>Logga in</Button></p>
            </div>
        )
    }
}

export default Login