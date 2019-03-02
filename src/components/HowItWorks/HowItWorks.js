import React from 'react';
import {CardHeader, CardBody, CardText } from 'reactstrap';

import classes from "./HowItWorks.module.css";
import bckimg1 from '../../assets/images/how_overall.jpeg';
import bckimg2 from '../../assets/images/how_label.jpeg';
import bckimg3 from '../../assets/images/how_stitching.jpeg';
import bckimg4 from '../../assets/images/how_sole.jpeg';
import bckimg5 from '../../assets/images/how_box.jpeg';
import bckimg6 from '../../assets/images/how_seal.jpeg';
import bckimg1_1 from '../../assets/images/icon_overall.png';
import bckimg2_1 from '../../assets/images/icon_label.png';
import bckimg3_1 from '../../assets/images/icon_stitching.png';
import bckimg4_1 from '../../assets/images/icon_sole.png';
import bckimg5_1 from '../../assets/images/icon_box.png';
import bckimg6_1 from '../../assets/images/icon_seal.png';


const howItWorks = () => {
    const style = {
        fontSize : 10
    }

    return (
        <div className={classes["form-wrap"]}>
        <div className={classes.textblock}>
        <CardHeader tag="h5">Step 1</CardHeader>
        <CardBody >
        <CardText>Sign In if you already have an account or sign in/up
            using your already existing gmail or facebook account or
            you can sign up with us by navigating to the sign up page.
            click on sign in, then register an account.
        </CardText>
        </CardBody>

        <CardHeader tag="h5">Step 2</CardHeader>
        <CardBody >
        <CardText>Upload Pictures - We would need you to upload 6 compulsory pictures/images of the sneaker

        </CardText>
                        <div className={classes.gallery}>
                        <a target="_blank" href= {bckimg1} rel="noopener noreferrer">
                        <img src={bckimg1}  alt="Forest" width="600" height="400"/>
                        <img src={bckimg1_1} alt="Forest" width="600" height="400"/>
                        </a>
                        </div>

                        <div className={classes.gallery}>
                        <a target="_blank" href={bckimg2}  rel="noopener noreferrer">
                        <img src={bckimg2}  alt="Forest" width="600" height="400"/>
                        <img src={bckimg2_1}  alt="Forest" width="600" height="400"/>
                        </a>
                        </div>

                        <div className={classes.gallery}>
                        <a target="_blank" href={bckimg3} rel="noopener noreferrer">
                        <img src={bckimg3}  alt="Forest" width="600" height="400"/>
                        <img src={bckimg3_1} alt="Forest" width="600" height="400"/>
                        </a>
                        </div>

                        <div className={classes.gallery}>
                        <a target="_blank" href={bckimg3} rel="noopener noreferrer">
                        <img src={bckimg4} alt="Forest" width="600" height="400"/>
                        <img src={bckimg4_1} alt="Forest" width="600" height="400"/>
                        </a>
                        </div>

                        <div className={classes.gallery}>
                        <a target="_blank" href={bckimg5} rel="noopener noreferrer">
                        <img src={bckimg5} alt="Forest" width="600" height="400"/>
                        <img src={bckimg5_1} alt="Forest" width="600" height="400"/>
                        </a>
                        </div>

                        <div className={classes.gallery}>
                        <a target="_blank" href={bckimg6} rel="noopener noreferrer">
                        <img src={bckimg6} alt="Forest" width="600" height="400"/>
                        <img src={bckimg6_1} alt="Forest" width="600" height="400"/>
                        </a>
                        </div>
        <p style={style}> **feel free to add more images/pictured after adding
            the compulsory 6 images/picture** </p>  </CardBody>

        <CardHeader tag="h5">Step 3</CardHeader>
            <CardBody>
            <CardText>Proceed to Checkout and make payment.</CardText>
            </CardBody>
        <CardHeader tag="h5">Step 4</CardHeader>
            <CardBody>
            <CardText>In 24hours you will get an email containing a link to the
                authentication certificate report and a final result, stating
                if the sneakers is legit or fake.</CardText>
        </CardBody>

        </div>
        </div>
    );
};

export default howItWorks;