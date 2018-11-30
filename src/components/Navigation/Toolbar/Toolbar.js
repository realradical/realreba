import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SiteName from "../../SiteName/SiteName";


const toolbar = ( ) => (
    <header className={classes.Toolbar}>
        <div className={`${classes.Logo} ${classes.box}`}>
            <Logo />
        </div>
        <div className={`${classes.box}`}>
            <SiteName>AuthWork</SiteName>
        </div>
        <nav className={`${classes.DesktopOnly} ${classes.box}`}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;