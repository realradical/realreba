import React from 'react';
import classes from "./HowItWorks.module.css";
import bckimg1 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.10 PM.jpeg';
import bckimg2 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.11 PM.jpeg';
import bckimg3 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.13 PM.jpeg';
import bckimg4 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.13 PM (1).jpeg';
import bckimg5 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.13 PM (2).jpeg';
import bckimg6 from '../../assets/images/WhatsApp Image 2019-01-13 at 4.22.13 PM (3).jpeg';



const howItWorks = () => {
    return <div>
                <div className={classes.textblock}>
                <h3>Step 1</h3>
                <p> Sign up - Yup!!!, yes you need an account. you can sign in/up using your already existing <br/>
                    gmail or facebook account or you can sign up with us by navigating to the sign up page (click on sign
                    in)
                    then register an account.</p>
                </div>
            <div className={classes.textblock}>
                <h3>Step 2</h3>
                <p>Upload Pictures - We would need you to upload 6 compulsory pictures/images of the sneaker<br/>
                </p>
            </div>
            <div className={classes.textblock}>
                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg1} rel="noopener noreferrer">
                        <img src={bckimg1} alt="Forest" width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 1. Add a description of the image here </p></div>
                </div>

                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg2} rel="noopener noreferrer">
                        <img src={bckimg2} alt="Forest"  width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 2. Add a description of the image here </p></div>
                </div>

                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg3} rel="noopener noreferrer">
                        <img src={bckimg3} alt="Forest"  width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 3. Add a description of the image here </p></div>
                </div>

                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg4} rel="noopener noreferrer">
                        <img src={bckimg4} alt="Forest" width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 4. Add a description of the image here </p></div>
                </div>

                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg5} rel="noopener noreferrer">
                        <img src={bckimg5} alt="Forest" width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 5. Add a description of the image here </p></div>
                </div>

                <div className={classes.gallery}>
                    <a target="_blank" href={bckimg6} rel="noopener noreferrer">
                        <img src={bckimg6} alt="Forest" width="600" height="400"/>
                    </a>
                    <div className={classes.desc}><p> 6. Add a description of the image here </p></div>
                </div>
        <p> ***Upload other pictures - Can are also upload any other additional
                pictures or images.***</p>
            </div>

            <div className={classes.textblock}>
                <h3>Step 3</h3>
                <p>Pay - Proceed to payment page, enter your card information and click "Pay"</p>
            </div>

        <div className={classes.textblock}>
            <h3>Step 4</h3>
            <p>Result - Within 24hrs a result of the verification will be completed, and sent straight to your email
                address<br/>
                we have on file. </p>
        </div>
    </div>;
};

export default howItWorks;