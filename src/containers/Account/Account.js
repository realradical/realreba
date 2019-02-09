import React from 'react';
import classes from "./Account.module.css";
import WithContext from "../../hoc/WithContext";
import bckimg from '../../assets/images/mnz-1151552-unsplash.jpg';
import {db} from "../../firebase/firebase";

const myaccount = () => {

    const docRef = db.collection('users').doc('tomide');
            docRef.get().then((doc) => {
                if (doc.exists) {
                    let data = doc.data();
                    console.log("Document data:", Object.keys(data));
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    const docRef2 = db.collection('orders').doc('07dnz4GPgemmelQZ0I90');
            docRef2.get().then((doc) => {
                if (doc.exists) {
                    let data = doc.data();
                    console.log("Document data:", Object.keys(data));
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            }).catch(function (error) {
                console.log("Error getting document:", error);
            });


    return (
   <>
       <img src = {bckimg} alt = "text" height= {"100%"} width = {"100%"}/>
        <div className={classes.overflowTest}>
                <h1>My Account</h1>

        <table>
            <thead>
            <tr>
                <th>Order Name</th>
                <th>Order Date</th>
                <th>Order Result</th>
            </tr>
            </thead>
            <tbody>
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
                </tbody>
            </table>
            <br/>
            <br/>
            </div>
            </>

    );
};

export default WithContext(myaccount);
