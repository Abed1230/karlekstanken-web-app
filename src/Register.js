import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';


export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            fullName: null,
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
        const { fullName } = this.state

        return (
            <div>
                <h1>Registrera</h1>
                <div>
                    <p>Lösenord: {fullName}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Ditt namn' name='fullName' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div>
                    <p>Email: {email}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Din email' name='email' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <p> <Button>Registrera</Button></p>
            </div>
        )
    }
}

export default Register