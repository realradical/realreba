import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {Consumer} from "../../components/AppProvider";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
// import ResetPassword from "../../components/ResetPassword/ResetPassword";

import WithContext from "../../hoc/WithContext";


import classes from "./Login.module.css";



class Login extends Component {

    state = {
        toggleActive: "Login"
    };

    componentWillUnmount() {
        this.props.context.clearMessage();
    }

    clickHandler = (toggleType) => {
        this.props.context.clearMessage();
        this.setState({toggleActive: toggleType});
    };

    clickResetHandler = () => {
        this.setState({toggleActive: "Reset"});
    }

    credentialFormRender = (action, title) => {
        return (<Consumer>
            {({  ...context }) => (
                <CredentialForm
                    action={action}
                    title={title}
                    formType={this.state.toggleActive}
                    onSuccess={() => {
                        context.clearMessage();
                        if (this.props.redirect) {
                            this.props.history.push('/');
                        }
                    }}
                    onError={({ message }) => context.setMessage(`${message}`)}
                    onChange={context.clearMessage}
                    onClick={this.clickResetHandler}
                />
            )}
        </Consumer>)
    };

    render() {
        let loginForm = null;
        let buttonCssSignup = classes["toggle-option"];
        let buttonCssLogin = classes["toggle-option"];

        switch (this.state.toggleActive) {
            case "Signup":
                loginForm = this.credentialFormRender("createUser","Let's get started!");
                buttonCssSignup = `${classes["toggle-option"]} ${classes["toggle-option-active"]}`;
                break;
            case "Login":
                loginForm = this.credentialFormRender("signIn","Welcome back!");
                buttonCssLogin = `${classes["toggle-option"]} ${classes["toggle-option-active"]}`;
                break;
            default:
                loginForm = null;
        }

        let loginPage = (
                <div className={classes["login-toggle"]}>
                    <div
                        className={buttonCssSignup}
                        onClick={()=>this.clickHandler("Signup")}
                    >Sign Up
                    </div>
                    <div
                        className={buttonCssLogin}
                        onClick={()=>this.clickHandler("Login")}
                    >Login
                    </div>
                </div>

        );
        return (
            <div className={classes["login-wrap"]}>
                {/*{this.state.toggleActive === "Reset" ? <ResetPassword/> : loginPage}*/}
                {loginForm}
            </div>
        );
    }
}

export default withRouter(WithContext(Login));