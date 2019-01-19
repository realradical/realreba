import React from 'react';
import classes from "./Account.module.css";
import WithContext from "../../hoc/WithContext";



const aboutUs = () => {

    return (
    <div className={classes.Myaccount}>
        <div className={classes.Myaccount1}>
            <div className={classes.Myaccount2}>
                <h1>My Account</h1>
                <table>

                <tr>
                    <th>Order Name</th>
                    <th>Order Date</th>
                    <th>Order Result</th>
                </tr>
                  <tr>
                    <td>Yeezy 350 boost</td>
                    <td>Oct-18-2018</td>
                    <td>Legit</td>
                </tr><tr>
                    <td>Yeezy 350 boost</td>
                    <td>Oct-18-2018</td>
                    <td>Legit</td>
                </tr><tr>
                    <td>Yeezy 350 boost</td>
                    <td>Oct-18-2018</td>
                    <td>Legit</td>
                </tr>
                <tr>
                    <td>Classics Jordan 11 - blue and black color ways</td>
                    <td>Nov -08 -2017</td>
                    <td>Fake</td>
                </tr>
                <tr>
                    <td>Yeezy 350 boost</td>
                    <td>Oct-18-2018</td>
                    <td>Legit</td>
                </tr>
                <tr>
                    <td>Classics Jordan 11 - blue and black color ways</td>
                    <td>Nov -08 -2017</td>
                    <td>Fake</td>
                </tr>
                  <tr>
                    <td>Classics Jordan 11 - blue and black color ways</td>
                    <td>Nov -08 -2017</td>
                    <td>Fake</td>
                  </tr>
                </table>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    </div>
    );
};

export default WithContext(aboutUs);
