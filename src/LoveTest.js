import React, { Component } from 'react';
import { getQuestions, calculateResults, sum } from "./LoveLanguage";
import { Form, Button, Container, Card } from "react-bootstrap";
import { UserConsumer } from './UserContext';
import { Redirect } from 'react-router-dom';

class Answers {
    constructor(props) {
        this.alt1Value = [];
        this.alt2Value = [];

        for (let i = 0; i < sum; i++) {
            this.alt1Value.push(false);
            this.alt2Value.push(false);
            //console.log(this.value[i]);
        }
    }
}

export class LoveTest extends Component {

    constructor(props) {
        super(props);
        this.answers = new Answers();

        this.state = {

        }

    }

    setAnswerAlt1(index) {
        let newValue;
        let currentValue = this.answers.alt1Value[index];
        newValue = !currentValue;

        this.answers.alt1Value[index] = newValue;
        this.answers.alt2Value[index] = !newValue;
        //console.log("New Value" + newValue);

        this.setState({});
    }

    setAnswerAlt2(index) {
        let newValue;
        let currentValue = this.answers.alt2Value[index];
        newValue = !currentValue;

        this.answers.alt2Value[index] = newValue;
        this.answers.alt1Value[index] = !newValue;
        //console.log("New Value" + newValue);

        this.setState({});
    }

    render() {
        return (
            <UserConsumer>
                {user => {
                    return user && user.premium ?
                        <Container>
                            {
                                getQuestions().map((q, index) => {
                                    let a1 = this.answers.alt1Value[q.index];
                                    let a2 = this.answers.alt2Value[q.index];
                                    console.log(q.index + "   " + a1);
                                    console.log(q.index + "   " + a2);
                                    return (
                                        <Card key={index}>
                                            <h4>{q.index}</h4>
                                            <p>{q.alt1}</p>
                                            <Form.Check type="checkbox" name="check1"
                                                checked={a1} onChange={this.setAnswerAlt1.bind(this, q.index)} />
                                            <p>{a1.toString()}</p>
                                            <br />
                                            <p>{q.alt2}</p>
                                            <Form.Check type="checkbox" name="check2"
                                                checked={a2} onChange={this.setAnswerAlt2.bind(this, q.index)} />
                                            <p>{a2.toString()}</p>
                                            <br />
                                        </Card>
                                    )
                                })
                            }
                            <Button type="button" onClick={() => {
                                if (calculateResults(this.answers.alt1Value, this.answers.alt2Value))
                                    this.props.history.replace("/");
                            }}>Submit</Button>
                        </Container>
                        :
                        <Redirect to="/" />
                }}
            </UserConsumer>
        )
    }
}

export default LoveTest
