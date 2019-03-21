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

const navigationItems = (props) => (
    <Consumer>
        {({  ...context }) => (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/about-us" clickHandler={props.clicked}>About Us</NavigationItem>
            <NavigationItem link="/faq" clickHandler={props.clicked}>FAQ</NavigationItem>
            <NavigationItem link="/authentication" clickHandler={props.clicked}>Authentication</NavigationItem>
            {context.state.currentUser ?
                (<>
                    <NavigationItem link="/myaccount" clickHandler={props.clicked}>My Account</NavigationItem>
                    <NavigationItem link="/signout"
                                    clickHandler={
                                        (event) => {
                                            event.preventDefault();
                                            try {
                                                props.clicked();
                                            } catch (e) {
                                                //execute from desktop version, no clickhandler available
                                            }
                                            auth.logout().then(() => {
                                                context.clearMessage();
                                                context.destroySession();
                                                // props.history.push('/');
                                            })
                                        }
                                    }>Sign Out</NavigationItem>
                </>)
                :
                <NavigationItem link="/login" clickHandler={props.clicked}>Login</NavigationItem>
            }
        </ul>
        )}
    </Consumer>
);

export default withRouter(navigationItems);