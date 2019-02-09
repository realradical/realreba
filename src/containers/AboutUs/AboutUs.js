import React from 'react';
import bckimg from '../../assets/images/mnz-1151552-unsplash.jpg';
import classes from "./AboutUs.module.css";


const aboutUs = () => {
    return (
            <div className={classes.container}>
                <img src = {bckimg} alt = "text" height= "10%" width = "100%"/>
                <div className={classes.textblock}>
                    <h1>About Us</h1>
            <p>
                <br/>

                Sneakers Sneakers Sneakers! that's all we know. We have been verifying sneakers for over 15 years and we
                know the counterfeit market. We have a team of sneakerhead authenticators, who have verified sneakers
                from the classic "J's 11", to the infamous "Yeezy boost 750's". We know sneakers and we know when they
                are counterfeit or legit.
                <br/>
                <br/>

                We have seen 99% replicas and can tell they are fake - even better than the actual
                manufacturers. Our elite team of authenticators have verified over 65000 shoes since 2004, and we a
                the leading authentication service provider in North America.
                <br/>
                <br/>


                Our authentication process generates a full report on the sneakers and we provide detailed reasons why
                a sneaker is counterfeit or legit. The detailed report generated on the authenticated sneaker is also hosted
                online as a record and a link to this report can be used on other sneaker retail sites
                (e.g. Stockx, Craiglist, Facebook etc..) to help boost the trust of the buyers.
                <br/>
                <br/>
                <br/>


            </p>

                </div>
            </div>
    );
};

export default aboutUs;
