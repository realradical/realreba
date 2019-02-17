import React from 'react';

import classes from "./AboutUs.module.css";
import BannerImg from "../../assets/images/test_aboutusBanner.jpg";


const aboutUs = () => {
    return (
        <>
            <div className={classes.banner} style={{backgroundImage: "url(" + BannerImg + ")" }}>
                <div className={classes.bannerText}>
                    Everything you need to know about AuthWork
                </div>
            </div>

            <div className={classes["form-wrap"]}>
                <h1>About Us</h1>
                <p className={classes.subtitle}>Our Passion</p>
                <p>
                    Sneakers Sneakers Sneakers! that's all we know. From the classic "J's 11", to the infamous "Yeezy
                    boost 750's". We have been verifying sneakers for years and we know what authenticity means to all
                    sneaker heads like us.
                </p>
                <p className={classes.subtitle}>Our Team</p>
                <p>
                    We are a small team of sneaker enthusiasts with a professional background in quality assurances and
                    inspection services. Our independent inspectors have access to our large up-to-date database of
                    counterfeit sneakers and forgery methods. Their keen eyes can detect any replica shoes from just a
                    few pictures of any sneakers.
                </p>
                <p className={classes.subtitle}>Our Mission</p>
                <p>
                    Every year millions of fake sneakers enter the American and European retail and second-hand market.
                    The counterfeiters constantly develop new methods to trick you into buying their knock-off
                    products. We are here to oppose those counterfeiters and put the safety back into the sneaker
                    sale. Our team of sneaker inspectors receives regular training to keep up with the latest forgery
                    efforts. Within one day we deliver a detailed inspection report, so you can rest assured that your
                    shoes are the real deal.
                </p>
            </div>
        </>
    );
};

export default aboutUs;
