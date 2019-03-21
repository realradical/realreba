import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import icon from "../../../assets/images/favicon-32x32.png";
import {Link} from "react-router-dom";


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.topDrawer}>
                    <Link to="/">
                        <img src={icon} alt="icon" onClick={props.closed}/>
                    </Link>
                    <button onClick={props.closed}><i className="fas fa-times fa-2x"></i></button>
                </div>
                <nav>
                    <NavigationItems clicked={props.closed}/>
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;