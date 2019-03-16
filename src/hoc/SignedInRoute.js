import React from 'react';
import {Route,Redirect} from "react-router-dom";

import WithContext from "./WithContext";


const signedInRoute = ({ component: Component, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            rest.context.state.currentUser
                ? <Redirect to='/' />
                : <Component {...props} />
        )} />
    )
};



export default WithContext(signedInRoute);
