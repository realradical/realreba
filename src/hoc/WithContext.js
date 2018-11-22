import React from 'react';

import {Consumer} from "../components/AppProvider";


const WithContext = (Component) => {
    return (props) => (
        <Consumer>
            {context =>  <Component {...props} context={context} />}
        </Consumer>)
};

export default WithContext;
