import React from 'react';

import classes from "./OrderSummary.module.css";


const orderSummary = () => {
    return (
        <div className={classes.wholeBox}>
            <div className={classes.title}>
                <span>Order Summary</span>
            </div>
            <div className={classes["summary-box"]}>
                <div className={classes["summary-line"]}>
                    <h4>Service</h4>
                    <p>Authentication</p>
                </div>
                <div className={classes["summary-line"]}>
                    <h4>Amount</h4>
                    <p>&#36;5.00</p>
                </div>
            </div>
        </div>
    );
};

export default orderSummary;
