import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import SiteName from "../../SiteName/SiteName";
import DrawerToggle from '../DrawerToggle/DrawerToggle';


const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div className={`${classes.box}`}>
            <SiteName>AuthWork</SiteName>
        </div><DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className={`${classes.DesktopOnly} ${classes.box}`}>
            <NavigationItems />
        </nav>

    </header>
);

export default toolbar;