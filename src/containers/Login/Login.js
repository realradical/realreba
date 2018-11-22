import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {Consumer} from "../../components/AppProvider";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import WithContext from "../../hoc/WithContext";


import classes from "./Login.module.css";



class Login extends Component {

    state = {
        toggleActive: "Login"
    };

    clickHandler = (toggleType) => {
        this.setState({toggleActive: toggleType});
        this.props.context.clearMessage();
    }

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
                            onChange={context.clearMessage}
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
                            onChange={context.clearMessage}
                        />
                    )}
                </Consumer>
            )
        }

        return (
                    <div className={classes["login-wrap"]}>
                        <div className={classes["login-toggle"]}>
                            <div className={this.state.toggleActive==='Signup' ?
                                [classes["toggle-option"],
                                    classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}
                                onClick={()=>this.clickHandler("Signup")}
                            >Sign Up</div>
                            <div className={this.state.toggleActive==='Login' ? [classes["toggle-option"],
                                classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}
                                 onClick={()=>this.clickHandler("Login")}
                            >Login</div>
                        </div>
                        {loginForm}
                    </div>
        );
    }
}

export default withRouter(WithContext(Login));