import React from 'react';
import {Link} from "react-router-dom";

import siteLogo from '../../assets/images/test_Logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <Link to="/">
            <img src={siteLogo} alt="Site Logo" />
        </Link>
    </div>
);

export default logo;