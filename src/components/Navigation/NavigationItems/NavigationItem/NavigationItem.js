import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
                 activeStyle={
                     {backgroundColor: '#FFFFFF',
                         borderBottom: '4px solid #7f7a85',
                         color: 'black'}}
                 onClick={props.clickHandler}
                 >{props.children}</NavLink>
    </li>
);

export default navigationItem;