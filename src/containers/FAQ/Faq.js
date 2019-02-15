import React from 'react';
import {CardHeader, CardBody, CardText } from 'reactstrap';
import img from "../../assets/images/test_authBanner.jpg";
import classes from './Faq.module.css';

const Faq = () => {
    return <>
        <div className={classes.banner}>
            <img src = {img} alt = "text" /> </div>
        <div className={classes.header}> <h1> Frequently Asked Questions  </h1> </div>
        <div className={classes.textblock}>
            <CardHeader tag="h5">Question : What is Authworks?</CardHeader>
            <CardBody >
            <CardText>Authworks is a sneaker verification company, established privately
                15years ago. We have been private verifier for elite brands and clients,
                but we decided to go public in 2014. We are a collection of sneaker
                heads and sneaker enthusiast, who love the culture, street wear and anything
                fly. </CardText>
            </CardBody>

            <CardHeader tag="h5">Question : How can I contact Authworks?</CardHeader>
            <CardBody>
                <CardText> Email support@authworks.com<br/>
                    To assist you as quickly as possible, please provide the following info:
                    <br/>• &nbsp; &nbsp; Email address associated with your Authworks account or your Authworks username
                    <br/>• &nbsp; &nbsp; Order# if related to a specific order
                    <br/>• &nbsp; &nbsp; Thorough description of your case
                    <br/>You may also be able to find answers to your questions even quicker on our
                    FAQ page! Otherwise we look forward to connecting with you soon.
                    We do not currently offer support via phone or in-person,
                    but may be something we offer in the future. </CardText>
            </CardBody>
            <CardHeader tag="h5">Question : How does AuthWork verify my sneakers?</CardHeader>
            <CardBody>
                <CardText>We take verification very seriously. Once pictures are submitted to our
                    platform, our verification team looks at every single picture. No exceptions.
                    They review every picture to make sure they are legit and are also in deadstock condition.
                    Once confirmed, a report is generated stating if the sneakers are legit or fake,
                    a copy of the report is email to the customer </CardText>
            </CardBody>
            <CardHeader tag="h5">Question : Can i complete a verification without the original sneakers box? </CardHeader>
            <CardBody>
                <CardText>We currently require all sneakers verified by Authworks to be new and come in
                    the original box.
                    Most of our users are sneaker collectors and expect a certain quality.
                    We do allow the original box to be slightly damaged, such as minor dents.
                    We do not allow rips in the box. The box does need the lid and the box label indicating the
                    shoe size.Slight damage to the box consists of minor dents.
                    We do NOT allow boxes with major rips or tears.</CardText>
            </CardBody>
            <CardHeader tag="h5">Question : What are Authwork Verification Fees?</CardHeader>
            <CardBody>
                <CardText>Our verification fees are the lowest the game right now, we charge only $5USD
                    for each verification, and a credit on our platform is rei-ssued to the user,
                    if we are not able to complete the verification process. </CardText>
            </CardBody>
            <CardHeader tag="h5">Question : What happens if the pictures I uploaded have poor
                quality(minimum 300 dpi or 1500 x 2100 pixels)</CardHeader>
            <CardBody>
                <CardText>A high resolution picture is determined by its number of pixels;
                    more pixels improves the sharpness of the picture. If our verifiers are not able to
                    verifier your sneakers before he picture qualities are poor, you get a credit of the
                    amount paid on your account. You can upload new pictures and resubmit the sneakers for
                    verification.</CardText>
            </CardBody>
            <CardHeader tag="h5">Question : How long does it take to complete a verification? </CardHeader>
            <CardBody>
                <CardText>We try our best to complete verifications in less than 24 hours. An email
                    will be received
                    <br/> from us if the verification process would take longer, stating why the
                    verification took longer and when the verification would be completed.</CardText>
            </CardBody>

            <CardHeader tag="h5">Question : Can I get expedited verification?</CardHeader>
            <CardBody>
                <CardText>Unfortunately, due to the large amount of verification request we
                    receive on a daily basis, we do not have the capability to add expedited verification at
                    this time. We will continue to do everything in our power to authenticate and fulfill
                    orders as quickly as possible.</CardText>
            </CardBody>

        </div>
    </>;
};

export default Faq;
