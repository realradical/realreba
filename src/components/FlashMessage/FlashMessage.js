import React from 'react';
import { Consumer } from '../AppProvider';

import classes from "./FlashMessage.module.css";


const FlashMessage = () => <Consumer>
    {({ state }) => state.message && <small className={classes["flash-message"]}>
        {state.message}
    </small>}
</Consumer>;

export default FlashMessage;