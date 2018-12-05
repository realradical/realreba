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
    };

    credentialFormRender = (action, title) => {
        return (<Consumer>
            {({  ...context }) => (
                <CredentialForm
                    action={action}
                    title={title}
                    formType={this.state.toggleActive}
                    onSuccess={() => {
                        context.clearMessage();
                        this.props.history.push('/');
                    }}
                    onError={({ message }) => context.setMessage(`${message}`)}
                    onChange={context.clearMessage}
                />
            )}
        </Consumer>)
    };

    render() {
        let loginForm = null;

        switch (this.state.toggleActive) {
            case "Signup":
                loginForm = this.credentialFormRender("createUser","Let's get started!");
                break;
            case "Login":
                loginForm = this.credentialFormRender("signIn","Welcome back!");
                break;
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