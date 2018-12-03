import React from 'react';

import classes from "./Account.module.css";
import WithContext from "../../hoc/WithContext";



const aboutUs = () => {

    return (
        <div className={classes.AboutUs}>
            <h1>My Account</h1>
            <p>

            </p>
        </div>
    );
};

export default WithContext(aboutUs);
