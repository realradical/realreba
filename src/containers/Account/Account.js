import React from 'react';
import classes from "./Account.module.css";
import WithContext from "../../hoc/WithContext";
import bckimg from '../../assets/images/mnz-1151552-unsplash.jpg';

const aboutUs = () => {
    return (
   <div>
       <img src = {bckimg} alt = "text" height= {"100%"} width = {"100%"}/>
        <div className={classes.overflowTest}>
        <div className={classes.tableblock}>

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
                </tr>
                <tr>
                    <td>Yeezy 350 boost</td>
                    <td>Oct-18-2018</td>
                    <td>Legit</td>
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

                </table>
            <br/>
            <br/>


            </div>
        </div>
    </div>

    );
};

export default WithContext(aboutUs);
