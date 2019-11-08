import React, { Component } from 'react';
import { getQuestions, calculateResults, sum } from "./LoveLanguage";
import { Row, Col, Form, Button, Container, Card, Dropdown } from "react-bootstrap";
import { UserConsumer } from './UserContext';
import { Redirect } from 'react-router-dom';
import LoveLanguages from './LoveLanguages.json';
import MyTitleBar from './components/MyTitleBar';

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
            lang: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        const lang = calculateResults(this.answers.alt1Value, this.answers.alt2Value);
        if (lang)
            this.setState({
                lang: lang
            });
        // TODO: handle error
    }

    render() {
        const lang = this.state.lang;
        if (lang) {
            return (
                <>
                    <MyTitleBar title="Kärleksspråktestet" />
                    <Container>
                        <Row className="mt-5 justify-content-md-center">
                            <Col md="9" className="text-center">
                                <h6 className="mb-3">Ditt kärleksspråk</h6>
                                <Dropdown.Divider />
                                <h4>{LoveLanguages[lang].name} ({lang})</h4>
                                <p className="mt-2">{LoveLanguages[lang].description}</p>
                                <Button className="mt-3" variant="info" onClick={() => this.props.history.replace("/")}>Klar</Button>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }
        return (
            <UserConsumer>
                {user => {
                    return user && user.premium ?
                        <>
                            <MyTitleBar title="Kärleksspråktestet" />
                            <Container className="mt-3">
                                {
                                    getQuestions().map((q, index) => {
                                        let a1 = this.answers.alt1Value[q.index];
                                        let a2 = this.answers.alt2Value[q.index];
                                        console.log(q.index + "   " + a1);
                                        console.log(q.index + "   " + a2);
                                        return (
                                            <div style={{ padding: 10 }}>
                                                <Card key={index}>
                                                    <h5 className="text-left" style={{ borderRadius: 3, backgroundColor: ('#008B8B'), padding: 3, color: ('white') }}>{'Fråga ' + (q.index + 1)}</h5>

                                                    <Row>
                                                        <Col>
                                                            <p>{q.alt1}</p>
                                                        </Col>
                                                        <Col xs='2'>
                                                            <Form.Check className="text-right" style={{paddingRight:10}} type="checkbox" name="check1"
                                                                checked={a1} onChange={this.setAnswerAlt1.bind(this, q.index)} />
                                                            {/*<p>{a1.toString()}</p>*/}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>{q.alt2}</p>
                                                        </Col>
                                                        <Col xs='2'>
                                                            <Form.Check className="text-right" style={{paddingRight:10}} type="checkbox" name="check2"
                                                                checked={a2} onChange={this.setAnswerAlt2.bind(this, q.index)} />
                                                            {/*<p>{a2.toString()}</p>*/}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
                                <Button type="button" onClick={this.handleSubmit}>Submit</Button>
                            </Container>
                        </>
                        :
                        <Redirect to="/" />
                }}
            </UserConsumer>
        )
    }
}

export default LoveTest
