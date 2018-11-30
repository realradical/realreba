import React from 'react';
import classes from './SiteName.module.css';
import {Link} from "react-router-dom";

const siteName = (props) => {
    return (
        <div className={classes["site-name"]}>
            <Link to="/">
                {props.children}
            </Link>
        </div>
    );
};

export default siteName;
