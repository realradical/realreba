import React, {Component} from 'react';

import CountUp from 'react-countup';
import { Jumbotron, Container } from 'reactstrap';

import HomeImg from '../../assets/images/home_img.jpg';
import startImg from '../../assets/images/home-start.jpg';
import authImg from '../../assets/images/home-auth.jpg';
import certificateImg from "../../assets/images/home-certificate.jpg";

import classes from './HomeContent.module.css';


class HomeContent extends Component {


    routeChange = () => {
        let path = `/authentication/start`;
        this.props.history.push(path);
    };

    render() {
        let one_day= 1000*60*60*24;
        let difference = new Date() - new Date('2019-01-01');
        let difference_day = Math.round(difference/one_day);

        return (
            <div className={classes.HomeContent}>
                <Jumbotron fluid className={classes.bannerWrapper} style={{backgroundImage: "url(" + HomeImg + ")" }}>
                    <Container fluid className={classes.banner}>
                        <h1 className="display-5">Are Your Sneakers Legit or Fake?</h1>
                        <p className="lead">Your sneakers deserve a certificate.</p>

                        <div className={classes.buttonWrapper}>
                            <button type="button" onClick={this.routeChange}>Start now</button>
                        </div>


                    </Container>
                    <div className={classes.pillarContainer}>
                        <ul >
                            <li>
                                <i className="fas fa-tasks"></i>
                                <div>Items Authenticated</div>
                                <CountUp
                                    start={1000}
                                    end={3000+11*difference_day}
                                    duration={2}
                                    separator=","
                                />
                            </li>
                            <li>
                                <i className="far fa-clock"></i>
                                <div>Response Time in Hours</div>
                                <CountUp
                                    start={500}
                                    end={24}
                                    duration={2}
                                    separator=","
                                    prefix="<"
                                />
                            </li>
                        </ul>
                    </div>

                </Jumbotron>

                <div className={classes.sectionWrapper}>
                    <div className={classes.middleSection}>
                        <h2>Why authenticate</h2>
                        <p>Every year millions of fake sneakers enter the retail and grey market.
                            The counterfeiters constantly develop new methods to trick you into buying their knock-off products.
                            Our service builds trust between sneaker sellers and buyers.
                        </p>
                    </div>

                    <div className={classes.instructionWrapper}>
                        <span>
                            <img src={startImg} alt="start"/>
                        </span>
                        <div className={classes.instruction}>
                            <h3>Sign up to access to our exclusive services</h3>
                        </div>
                    </div>

                    <div className={classes.instructionWrapper}>
                        <div className={classes.instruction}>
                            <h3>Send us a few detailed pictures</h3>
                        </div>
                        <span>
                            <img src={authImg} alt="auth"/>
                        </span>
                    </div>

                    <div className={classes.instructionWrapper}>
                        <span>
                            <img src={certificateImg} alt="certificate"/>
                        </span>
                        <div className={classes.instruction}>
                            <h3>Receive your certificate of authenticity within 24 hours</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default HomeContent;
