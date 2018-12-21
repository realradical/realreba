import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

import "./CheckoutForm.css";



class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token)
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="holderName">Cardholder Name</Label>
                    <Input type="text"
                           onChange = {this.onTypeInputItemName}
                           name="holderName" id="holderName"
                           placeholder="Full name (on card)"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="cardDetails">Credit or Debit Card</Label>
                    <CardElement name="cardDetails" id="cardDetails"
                                 style={{
                                     base: {
                                         fontSize: '16px',
                                         fontFamily: '-apple-system,"Ubuntu", sans-serif, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n' +
                                             '    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue" '
                                     }
                                 }}/>
                </FormGroup>

                <FormGroup style={{textAlign:'center'}}>
                    <Button onClick={this.submit} block size="lg" color="info">Pay</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default injectStripe(CheckoutForm);
