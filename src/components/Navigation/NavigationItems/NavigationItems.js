import React from 'react';
import { withRouter } from 'react-router-dom';

import {Consumer} from "../../AppProvider";
import { auth } from '../../../firebase/';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

// const clickHandler = (event) => {
//     event.preventDefault();
//     auth.logout().then(() => {
// })
// }

const navigationItems = () => (
    <Consumer>
        {({  ...context }) => (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/about-us">About Us</NavigationItem>
            <NavigationItem link="/authentication">Authentication</NavigationItem>
            {context.state.currentUser ?
                (<>
                    <NavigationItem link="/myaccount">My Account</NavigationItem>
                    <NavigationItem link="/signout"
                                    clickHandler={
                                        (event) => {
                                            event.preventDefault();
                                            auth.logout().then(() => {
                                                context.clearMessage();
                                                context.destroySession();
                                                // props.history.push('/');
                                            })
                                        }
                                    }>Sign Out</NavigationItem>
                </>)
                :
                <NavigationItem link="/login">Login</NavigationItem>
            }
        </ul>
        )}
    </Consumer>
);

export default withRouter(navigationItems);