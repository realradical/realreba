import React from 'react';
import {Link} from "react-router-dom";


import classes from "./Footer.module.css";


const footer = () => {
    return (
        <footer className={classes["footer-distributed"]}>

            <div className={classes["footer-right"]}>

                <a href="https://www.facebook.com/authwork/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/authworksocial" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>

            </div>

            <div className={classes["footer-left"]}>

                <p className={classes["footer-links"]}>
                    <Link to="/about-us" className="link-1" href="#">About Us</Link>
                    <Link to={{pathname: "/authentication/how-it-works", state: "T2"}}>How It Works</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact-us">Contact Us</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </p>

                <p>AuthWork &copy; 2019</p>
            </div>

        </footer>
    );
};

export default footer;
