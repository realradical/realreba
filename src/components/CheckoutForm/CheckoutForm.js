import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Api from "../../axios";
import Spinner from "../Spinner/Spinner";
import "./CheckoutForm.css";



class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    state = {
        paymentSuccess: false,
        loading: false,
        holderName: null
    };

    startLoading = () => {
        this.setState({loading: true});
    };

    endLoading = () => {
        this.setState({loading: false});
    };

    async submit(event) {
        event.preventDefault();

        const {token} = await this.props.stripe.createToken({name: this.state.holderName});
        const uid = this.props.currentuser.uid;
        this.startLoading();

        Api.post("/charge/", {token,uid})
            .then(res => {
                this.setState({paymentSuccess: true});
                this.endLoading();
            })
            .catch(err => console.log(err.response));
    }

    onTypeInputItemName = (e) => {
        this.setState({holderName:e.target.value});
    };

    render() {
        const checkOut = (
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
                    <CardElement id="cardDetails"
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

        const paymentSuccess = (
            <h2>Payment Complete</h2>
        );

        return (
            this.state.loading ? (<Spinner/>) : (this.state.paymentSuccess ? paymentSuccess : checkOut)
        );
    }
}

export default injectStripe(CheckoutForm);
