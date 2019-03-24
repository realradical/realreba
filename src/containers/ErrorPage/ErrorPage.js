import React from 'react';
import {Link} from "react-router-dom";


import classes from "./ErrorPage.module.css";
import errorImg from "../../assets/images/error-img.jpg";


const errorPage = () => {
    return (
        <div className={classes["error-page"]}>
            <h1>404 Page Not Found</h1>
            <p>Oops! We couldn't find what you were looking for, but you can check out our <Link to={"/"}>home page</Link>.</p>

            <div className={classes.imgContainer}>
                <img src={errorImg} alt="error 404"></img>
            </div>
        </div>
    );
};

export default errorPage;
