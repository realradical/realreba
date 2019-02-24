import React from 'react';
import {Link} from "react-router-dom";


import classes from "./Footer.module.css";


const footer = () => {
    return (
        <footer className={classes["footer-distributed"]}>

            <div className={classes["footer-right"]}>

                <Link to="/"><i className="fab fa-facebook"></i></Link>
                <Link to="/"><i className="fab fa-twitter"></i></Link>
                <Link to="/"><i className="fab fa-linkedin"></i></Link>
                <Link to="/"><i className="fab fa-instagram"></i></Link>

            </div>

            <div className={classes["footer-left"]}>

                <p className={classes["footer-links"]}>
                    <Link to="/about-us" className="link-1" href="#">About Us</Link>
                    <Link to="/authentication/how-it-works">How It Works</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact-us">Contact Us</Link>
                    <Link to="/about-us">Privacy Policy</Link>
                </p>

                <p>AuthWork &copy; 2019</p>
            </div>

        </footer>
    );
};

export default footer;
