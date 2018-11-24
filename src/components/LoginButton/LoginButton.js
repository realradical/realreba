import React from 'react';

import classes from "./LoginButton.module.css";


const loginButton = (props) => {
    return (
        <button className={[classes["loginBtn"],
            classes["loginBtn--Facebook" ]].join(" ")}
                onClick={props.onClick}
        >
            Login with {props.name}
        </button>
    );
};

export default loginButton;
