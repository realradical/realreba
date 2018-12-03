import React from 'react';
import {Route,Redirect} from "react-router-dom";

import WithContext from "./WithContext";


const privateRoute = ({ component: Component, ...rest }) => {
    console.log(rest);
    return(
        <Route {...rest} render={(props) => (
            rest.context.state.currentUser
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
};



export default WithContext(privateRoute);
