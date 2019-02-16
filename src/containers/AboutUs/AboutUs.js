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
                    Sneakers Sneakers Sneakers! that's all we know. We have been verifying sneakers for over 15 years and we
                    know the counterfeit market. We have a team of sneakerhead authenticators, who have verified sneakers
                    from the classic "J's 11", to the infamous "Yeezy boost 750's". We know sneakers and we know when they
                    are counterfeit or legit.
                </p>
                <p className={classes.subtitle}>Our Expertise</p>
                <p>
                    We have seen 99% replicas and can tell they are fake - even better than the actual
                    manufacturers. Our elite team of authenticators have verified over 65000 shoes since 2004, and we are
                    the leading authentication service provider in North America.
                </p>
                <p className={classes.subtitle}>Our Value</p>
                <p>
                    Our authentication process generates a full report on the sneakers and we provide detailed reasons why
                    a sneaker is counterfeit or legit. The detailed report generated on the authenticated sneaker is also hosted
                    online as a record and a link to this report can be used on other sneaker retail sites
                    (e.g. Stockx, Craiglist, Facebook etc..) to help boost the trust of the buyers.
                </p>
            </div>
        </>
    );
};

export default aboutUs;
