import React, {Component} from 'react';

import classes from "./LoginButton.module.css";


class loginButton extends Component {

    render() {

        let buttonCss = null;
        if (this.props.name==="Facebook") {
            buttonCss = `${classes.loginBtn} ${classes["loginBtn--facebook"]}`;
        } else if (this.props.name==="Google") {
            buttonCss = `${classes.loginBtn} ${classes["loginBtn--google"]}`;
        }

        let buttonText = null;
        if (this.props.action==="createUser") {
            buttonText = "Sign Up";
        } else if (this.props.action==="signIn") {
            buttonText = "Login";
        }
        return (
            <button className={buttonCss}
                    onClick={this.props.onClick}
            >
                {buttonText} {this.props.name}
            </button>
        );
    }
}

export default loginButton;
