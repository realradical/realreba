import React from 'react';
import {CardHeader, CardBody, CardText } from 'reactstrap';
import {Link} from 'react-router-dom';


import faqBanner from "../../assets/images/test_faqBanner.jpg";
import classes from './Faq.module.css';


const Faq = () => {
    return (
        <>
            <div className={classes.banner} style={{backgroundImage: "url(" + faqBanner + ")" }}></div>

                <div className={classes["form-wrap"]}>
                    <h1>Frequently Asked Questions</h1>
                    <div className={classes.textblock}>
                        <CardHeader tag="h5">Question: What is Authwork?</CardHeader>
                        <CardBody >
                        <CardText>Authwork is a sneaker verification company. We have been a private verifier for elite brands and clients,
                            but we decided to go public in 2016. We are a collection of sneaker
                            heads and sneaker enthusiast, who love the culture, streetwear and anything
                            fly. </CardText>
                        </CardBody>

                        <CardHeader tag="h5">Question: How can I contact Authwork?</CardHeader>
                        <CardBody>
                            <CardText> Please use our <Link to={"/contact-us"}>contact form</Link>.<br/>
                                To assist you as quickly as possible, please provide the following info:
                                <br/>• &nbsp; &nbsp; Email address associated with your Authwork account
                                <br/>• &nbsp; &nbsp; Order number if the inquiry is related to a specific order
                                <br/>• &nbsp; &nbsp; Thorough description of your case
                                <br/>We look forward to connecting with you soon.
                                </CardText>
                        </CardBody>
                        <CardHeader tag="h5">Question: How does AuthWork verify my sneakers?</CardHeader>
                        <CardBody>
                            <CardText>We take verification very seriously. Once pictures are submitted to our
                                platform, our verification team looks at every single picture. No exceptions.
                                They review every picture to make sure they are legit and are also in deadstock condition.
                                Once confirmed, a report is generated stating if the sneakers are legit or fake,
                                a copy of the report is emailed to the customer. </CardText>
                        </CardBody>
                        <CardHeader tag="h5">Question: Can I complete a verification without the original sneakers box? </CardHeader>
                        <CardBody>
                            <CardText>We currently require all sneakers verified by Authwork to be new and come in
                                the original box.
                                Most of our users are sneaker collectors and expect a certain quality.
                                We do allow the original box to be slightly damaged, such as minor dents.
                                We do not allow rips in the box. The box does need the lid and the box label indicating the
                                shoe size.Slight damage to the box consists of minor dents.
                                We do NOT allow boxes with major rips or tears.</CardText>
                        </CardBody>
                        <CardHeader tag="h5">Question: What are Authwork Verification Fees?</CardHeader>
                        <CardBody>
                            <CardText>Our verification fees are the lowest in the game right now, we charge only $5 USD
                                for each verification, and a credit on our platform is refunded to the user,
                                if we are not able to complete the verification process. </CardText>
                        </CardBody>
                        <CardHeader tag="h5">Question: What happens if the pictures I uploaded have poor
                            quality(minimum 300 dpi or 1500 x 2100 pixels)</CardHeader>
                        <CardBody>
                            <CardText>A high-resolution picture is determined by its number of pixels.
                                More pixels improve the sharpness of the picture. If our verifiers are not able to
                                verify your sneakers because the picture qualities are poor, you will get a credit of the
                                amount paid on your account. You can take new pictures and resubmit your order for
                                verification.</CardText>
                        </CardBody>
                        <CardHeader tag="h5">Question: How long does it take to complete a verification? </CardHeader>
                        <CardBody>
                            <CardText>We try our best to complete verifications in less than 24 hours. We will notify you
                            via email if and why an authentication process takes longer than the original 24 hours.
                            </CardText>
                        </CardBody>

                        <CardHeader tag="h5">Question: Can I get expedited verification?</CardHeader>
                        <CardBody>
                            <CardText>Unfortunately, due to the large amount of verification request we
                                receive on a daily basis, we do not have the capability to add expedited verification at
                                this time. We will continue to do everything in our power to authenticate and fulfill
                                orders as quickly as possible.</CardText>
                        </CardBody>

                    </div>
                </div>
        </>
)
};

export default Faq;
