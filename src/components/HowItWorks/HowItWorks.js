import React from 'react';
import {CardHeader, CardBody, CardText } from 'reactstrap';

import classes from "./HowItWorks.module.css";
// import bckimg1 from '../../assets/images/how_overall.jpeg';
// import bckimg2 from '../../assets/images/how_label.jpeg';
// import bckimg3 from '../../assets/images/how_stitching.jpeg';
// import bckimg4 from '../../assets/images/how_sole.jpeg';
// import bckimg5 from '../../assets/images/how_box.jpeg';
// import bckimg6 from '../../assets/images/how_seal.jpeg';


const howItWorks = () => {
    return (
        <div className={classes["form-wrap"]}>
            <div className={classes.textblock}>
                <CardHeader tag="h5">Step 1</CardHeader>
                <CardBody >
                    <CardText>Sign up - Yup!!!, yes you need an account. you can sign in/up using your already existing
                        gmail or facebook account or you can sign up with us by navigating to the sign up page (click on sign
                        in) then register an account.
                    </CardText>
                </CardBody>

                <CardHeader tag="h5">Step 2</CardHeader>
                <CardBody >
                    <CardText>Upload Pictures - We would need you to upload 6 compulsory pictures/images of the sneaker
                    </CardText>
                </CardBody>

            </div>
        </div>
    );
};

export default howItWorks;