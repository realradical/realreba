import React, {
    Component,
    createRef
} from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase/';
import {facebookAuthProvider, googleAuthProvider} from "../../firebase/firebase";
import {isMobile} from "react-device-detect";


import WithContext from '../../hoc/WithContext';

import LoginButton from "../LoginButton/LoginButton";
import classes from "./CredentialForm.module.css";
import FlashMessage from "../FlashMessage/FlashMessage";


class CredentialForm extends Component {
    constructor(props) {
        super(props);

        this.email = createRef();
        this.password = createRef();
        this.password2 = createRef();
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSuccess() {
        this.resetForm();
        this.props.onSuccess && this.props.onSuccess();
    }

    handleErrors(reason) {
        this.props.onError && this.props.onError(reason);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            email,
            password,
            props: {action}
        } = this;

        if (action === "createUser" && this.password.current.value !== this.password2.current.value) {
            this.props.context.setMessage("Password does not match the confirm password.");
        } else {
            auth.userSession(
                action,
                email.current.value,
                password.current.value
            ).then(this.handleSuccess).catch(this.handleErrors);
        }
    }

    resetForm() {
        if (!this.email.current || !this.password.current) { return }
        const { email, password } = CredentialForm.defaultProps;
        this.email.current.value = email;
        this.password.current.value = password;
    }

    facebookClickHandler = () => {
        /**
         * Web Responsive Login with popup
         * Mobile Device Login with redirect
         */
        if (!isMobile) {
            auth.socialLoginPopup(facebookAuthProvider)
                .then(this.handleSuccess).catch(this.handleErrors);
        } else {
            auth.socialLoginRedirect(facebookAuthProvider)
                .then(this.handleSuccess).catch(this.handleErrors);
        }
    };

    googleClickHandler = () => {
        /**
         * Web Responsive Login with popup
         * Mobile Device Login with redirect
         */
        if (!isMobile) {
            auth.socialLoginPopup(googleAuthProvider)
                .then(this.handleSuccess).catch(this.handleErrors);
        } else {
            auth.socialLoginRedirect(googleAuthProvider)
                .then(this.handleSuccess).catch(this.handleErrors);
        }
    };

    render() {
        let confirmPassword = this.props.formType==="Signup" ?
            (<input
                name="password2"
                type="password"
                autoComplete="none"
                placeholder="Confirm Password"
                ref={this.password2}
                onChange={this.props.onChange}
            />)
            :null;

        return (
            <>
                <h3 className={classes["welcome-message"]}>{this.props.title}</h3>
                <LoginButton name="Facebook" action={this.props.action} onClick={this.facebookClickHandler}/>
                <LoginButton name="Google" action={this.props.action} onClick={this.googleClickHandler}/>
                <h4 className={classes["center-text"]}><span>Or</span></h4>
                <form className={classes.credentialForm} onSubmit={this.handleSubmit}>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        ref={this.email}
                        onChange={this.props.onChange}
                    />
                    <input
                        name="password"
                        type="password"
                        autoComplete="none"
                        placeholder="Password"
                        ref={this.password}
                        onChange={this.props.onChange}
                    />
                    {confirmPassword}
                    <FlashMessage/>
                    <div style={{textAlign:"center", paddingBottom:"10px"}}>
                        <button className={classes["credentialForm-button"]}
                                type="submit" >{this.props.formType==="Signup" ? "Create Account" : "Login"}</button>
                    </div>
                </form>
            </>
        )
    }
}

CredentialForm.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

CredentialForm.defaultProps = {
    errors: '',
    email: '',
    password: ''
};

export default WithContext(CredentialForm);