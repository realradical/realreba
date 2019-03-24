import React from 'react';
import {CardHeader, CardBody, CardText } from 'reactstrap';

import classes from "./HowItWorks.module.css";
import overallImg from '../../assets/images/how_overall.jpg';
import labelImg from '../../assets/images/how_label.jpg';
import stitchingImg from '../../assets/images/how_stitching.jpg';
import soleImg from '../../assets/images/how_sole.jpg';
import boxImg from '../../assets/images/how_box.jpg';
import sealImg from '../../assets/images/how_seal.jpg';
import overallIcon from '../../assets/images/icon_overall.png';
import labelIcon from '../../assets/images/icon_label.png';
import stitchingIcon from '../../assets/images/icon_stitching.png';
import soleIcon from '../../assets/images/icon_sole.png';
import boxIcon from '../../assets/images/icon_box.png';
import sealIcon from '../../assets/images/icon_seal.png';
import {Col, Container, Row} from "reactstrap/lib";


const howItWorks = () => {

    return (
        <div className={classes["form-wrap"]}>
            <div className={classes.textblock}>
                <CardHeader tag="h5">Step 1</CardHeader>
                <CardBody >
                    <CardText>Log in if you already have an account or sign-up
                        using your already existing Google or Facebook account or
                        you can register a new account by navigating to the sign-up page.
                    </CardText>
                </CardBody>

                <CardHeader tag="h5">Step 2</CardHeader>
                    <CardBody >
                        <CardText>We would need you to upload 6 compulsory pictures of the sneaker (see below instructions).
                            Feel free to add additional pictures for more details.
                        </CardText>

                        <Container className={classes.container}>
                            <Row>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={overallImg} className="img-fluid" alt="overall"/>
                                        <span className={classes["text-block"]}>
                                            <img src={overallIcon} alt="overall icon" width="50" height="50"/>
                                            Overall look
                                        </span>
                                    </div>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={labelImg} className="img-fluid" alt="label"/>
                                        <span className={classes["text-block"]}>
                                            <img src={labelIcon} alt="label icon" width="50" height="50"/>
                                            Label inside
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={stitchingImg} className="img-fluid" alt="stitching"/>
                                        <span className={classes["text-block"]}>
                                            <img src={stitchingIcon} alt="stitching icon" width="50" height="50"/>
                                            Sole stitching
                                        </span>
                                    </div>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={soleImg} className="img-fluid" alt="sole"/>
                                        <span className={classes["text-block"]}>
                                            <img src={soleIcon} alt="sole icon" width="50" height="50"/>
                                            Inner sole
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={boxImg} className="img-fluid" alt="box"/>
                                        <span className={classes["text-block"]}>
                                            <img src={boxIcon} alt="box icon" width="50" height="50"/>
                                            Product label
                                        </span>
                                    </div>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6} className={classes["col-div"]}>
                                    <div className={classes["example-container"]}>
                                        <img src={sealImg} className="img-fluid" alt="seal"/>
                                        <span className={classes["text-block"]}>
                                            <img src={sealIcon} alt="seal icon" width="50" height="50"/>
                                            Box seal
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>

            <CardHeader tag="h5">Step 3</CardHeader>
                <CardBody>
                    <CardText>Proceed to checkout and make payment.</CardText>
                </CardBody>
            <CardHeader tag="h5">Step 4</CardHeader>
                <CardBody>
                    <CardText>In 24 hours you will get an email containing a link to the
                    certificate of authenticity report and a final result, stating
                    if the sneakers are legit or fake.</CardText>
                </CardBody>

            </div>
        </div>
    );
};

export default howItWorks;