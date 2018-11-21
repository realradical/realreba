import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {Consumer} from "../../components/AppProvider";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import FlashMessage from "../../components/FlashMessage";

import classes from "./Login.module.css";



class Login extends Component {

    state = {
        toggleActive: "Login"
    };

    render() {
        let loginForm = null;

        if (this.state.toggleActive === "Signup") {
            loginForm =(
                <Consumer>
                    {({  ...context }) => (
                        <CredentialForm
                            action="createUser"
                            title="Let's get started!"
                            formType={this.state.toggleActive}
                            onSuccess={() => {
                                context.clearMessage();
                                this.props.history.push('/');
                            }}
                            onError={({ message }) => context.setMessage(`${message}`)}
                        />
                    )}
                </Consumer>
            )
        } else if (this.state.toggleActive === "Login") {
            loginForm =(
                <Consumer>
                    {({  ...context }) => (
                        <CredentialForm
                            action="signIn"
                            title="Welcome back!"
                            formType={this.state.toggleActive}
                            onSuccess={() => {
                                context.clearMessage();
                                this.props.history.push('/');
                            }}
                            onError={({ message }) => context.setMessage(`${message}`)}
                        />
                    )}
                </Consumer>
            )
        }

        return (
            <>
                <div className={classes["login-wrap"]}>
                    <div className={classes["login-toggle"]}>
                        <div className={this.state.toggleActive==='Signup' ?
                            [classes["toggle-option"],
                                classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}
                            onClick={() => {this.setState({toggleActive: "Signup"})}}
                        >Sign Up</div>
                        <div className={this.state.toggleActive==='Login' ? [classes["toggle-option"],
                            classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}
                             onClick={() => {this.setState({toggleActive: "Login"})}}
                        >Login</div>
                    </div>
                    {loginForm}
                    <FlashMessage/>
                </div>


            </>

        );
    }
}

export default withRouter(Login);