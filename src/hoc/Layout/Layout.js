import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from "./Layout.module.css";



class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    };

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    };

    render () {
        return (
            <>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout;