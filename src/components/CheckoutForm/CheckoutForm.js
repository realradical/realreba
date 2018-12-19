import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import "./CheckoutForm.css";



class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        // User clicked submit
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="holderName">Cardholder name</Label>
                    <Input type="text"
                           onChange = {this.onTypeInputItemName}
                           name="holderName" id="holderName"
                           placeholder="Cardholder name"
                           style={{fontStyle:'italic'}}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="cardDetails">Card details</Label>
                    <CardElement name="cardDetails" id="cardDetails"
                                 style={{
                                     base: {
                                         fontSize: '16px',
                                         '::placeholder': {
                                             fontStyle: 'italic'
                                         },
                                         fontFamily: '-apple-system,"Ubuntu", sans-serif, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n' +
                                             '    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue" '
                                     }
                                 }}/>
                </FormGroup>

                <FormGroup style={{textAlign:'center'}}>
                    <Button onClick={this.submit}>Pay</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default injectStripe(CheckoutForm);
