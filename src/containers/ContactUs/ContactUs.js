import React, {Component} from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import { ReCaptcha } from 'react-recaptcha-v3'

import bgImg from "../../assets/images/bg.jpg";
import classes from "./ContactUs.module.css";
import Api from "../../axios";
import WithContext from "../../hoc/WithContext";
import FlashMessage from "../../components/FlashMessage/FlashMessage";


class ContactUs extends Component {
    state = {
        name: '',
        email: '',
        orderid: '',
        message: '',
        valid: false,
        emailSentStatus: null,
        recaptchaToken: ''
    };

    _isSubmitted = false;


    verifyCallback = (recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!
        console.log(recaptchaToken);
        this.setState({recaptchaToken});
    };

    onTypeInputHandler = (event, inputId) => {
        this.setState({[inputId] : event.target.value});
    };

    checkItemNameValidity = (itemName) => {
        return itemName.trim() !== ''
    };

    onClickProceedHandler = (event) => {
        event.preventDefault();

        let valid = this.checkItemNameValidity(this.state.name) && this.checkItemNameValidity(this.state.email) &&
            this.checkItemNameValidity(this.state.message);
        this._isSubmitted = true;
        this.setState({valid});

        if (valid) {
            if (this.state.recaptchaToken === '') {
                this.props.context.setMessage("reCAPTCHA failed to verify.");
            } else {
                const name = this.state.name;
                const email = this.state.email;
                const orderid = this.state.orderid;
                const message = this.state.message;
                const recaptchaToken = this.state.recaptchaToken;

                Api.post("/contactus/", {name, email, orderid, message, recaptchaToken})
                    .then(res => {
                        this.setState({emailSentStatus: true});
                    }).catch(err => this.setState({emailSentStatus: false}));
            }
        }
    };

    render() {
        let nameValid = this._isSubmitted ? this.checkItemNameValidity(this.state.name) : true;
        let emailValid = this._isSubmitted ? this.checkItemNameValidity(this.state.email) : true;
        let messageValid = this._isSubmitted ? this.checkItemNameValidity(this.state.message) : true;

        let confirmContent = (
            <div className={classes.pageWrapper} style={{backgroundImage: "url(" + bgImg + ")"}}>
                <div className={classes["form-wrap"]}>
                    <h2>Your Message Sent!</h2>
                    <p>Thank you! We will get back to you as soon as possible.</p>
                </div>
            </div>
        );

        let errorContent = (
            <div className={classes.pageWrapper} style={{backgroundImage: "url(" + bgImg + ")"}}>
                <div className={classes["form-wrap"]}>
                    <h2>Something Went Wrong!</h2>
                    <p>Please make sure your email address is correct and send your message again.</p>
                </div>
            </div>
        );

        let contactForm = (<div className={classes.pageWrapper} style={{backgroundImage: "url(" + bgImg + ")"}}>
            <div className={classes["form-wrap"]}>
                <ReCaptcha
                    sitekey="6LenfZMUAAAAAEBOZexD6GwokA2Gyav_QokiEs6C"
                    action='contactform'
                    verifyCallback={this.verifyCallback}
                />

                <h1>Contact Us</h1>
                <Form>
                    <FormGroup>
                        <Input type="text"
                               onChange={(event) => this.onTypeInputHandler(event, 'name')}
                               name="name" id="name"
                               placeholder="Name*"
                               invalid={!nameValid}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="email"
                               onChange={(event) => this.onTypeInputHandler(event, 'email')}
                               name="email" id="email"
                               placeholder="Email*"
                               invalid={!emailValid}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               onChange={(event) => this.onTypeInputHandler(event, 'orderid')}
                               name="orderid" id="orderid"
                               placeholder="Order ID (if applicable)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea"
                               name="message" id="message"
                               onChange={(event) => this.onTypeInputHandler(event, 'message')}
                               maxLength={200}
                               rows={6}
                               placeholder="Please enter your message here*"
                               invalid={!messageValid}
                        />
                    </FormGroup>
                    <FlashMessage/>
                    <FormGroup style={{textAlign: 'center'}}>
                        <Button onClick={this.onClickProceedHandler} block size="lg" color="info">Send</Button>
                        <small>This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy"> Privacy Policy </a> and
                            <a href="https://policies.google.com/terms"> Terms of Service </a> apply.
                        </small>
                    </FormGroup>
                </Form>
            </div>
        </div>);

        let component = null;

        switch(this.state.emailSentStatus) {
            case false:
                component = errorContent;
                break;
            case true:
                component = confirmContent;
                break;
            default:
                component = contactForm;
        }

        return (
            component
        );
    }
}

export default WithContext(ContactUs);