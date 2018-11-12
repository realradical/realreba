import React from 'react';

import siteLogo from '../../assets/images/test_Logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={siteLogo} alt="Site Logo" />
    </div>
);

export default logo;