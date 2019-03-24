import React , {Component}  from 'react';
import {Link} from "react-router-dom";

import {db} from "../../firebase/firebase";
import classes from "./Account.module.css";
import {CardHeader} from 'reactstrap';
import WithContext from "../../hoc/WithContext";


class myaccount extends Component {

    state = {
        useraccountdata: [],
        result : null,
    };

    componentDidMount() {
        const userdata = [];
        const citiesRef = db.collection("orders");
        const query = citiesRef.where("uid", "==", this.props.context.state.currentUser.uid);
        query.get().then(results => {
            if (!results.empty) {
                results.forEach((doc) => {
                    const temp_doc = Object(doc.data());
                    temp_doc.orderid = doc.id;
                    userdata.push(temp_doc);
                    const num = String(userdata.length - 1);
                    userdata[num].createdAt = String(Date(userdata[num].createdAt));
                    const time_data = userdata[num].createdAt.split(" ");
                    userdata[num].createdAt = "   " + time_data[1] + "-" + time_data[2] + "-" + time_data[3] + "   ";
                });
                this.setState({useraccountdata: userdata});

            } else {
                this.setState({result: "You dont have any orders yet."});
            }
        }).catch(function(error) {
            console.log("Error getting orders:", error);
        });}

    render() {
        let userlist =  this.state.useraccountdata.map(item => {

            return <div key={item.orderid}>
                        <CardHeader tag="h5">Order #: {item.orderid}
                            <div className={classes.buttonWrapper}>
                                <Link to={"/report/"+item.orderid} target="_blank">
                                    <button disabled = {item.button_status} type="submit">Report
                                    </button>
                                </Link>
                            </div>
                        </CardHeader>

                        <div className={classes.orderWrapper}>
                            <div className={classes["order-div"]}>
                                <span className={classes.colname}>Order Date</span>
                                <span className={classes.colval}>{item.createdAt}</span>
                            </div>
                            <div className={classes["order-div"]}>
                                <span className={classes.colname}>Item Name</span>
                                <span className={classes.colval}>{item.itemName}</span>
                            </div>
                            <div className={classes["order-div"]}>
                                <span className={classes.colname}>Description</span>
                                <span className={classes.colval}>{item.description}</span>
                            </div>
                            <div className={classes["order-div"]}>
                                <span className={classes.colname}>Order Status</span>
                                <span className={classes.colval}>{item.status}</span>
                            </div>
                        </div>
                    </div>
        });

        let display = (
            <div className={classes.textblock}>
                    {userlist}
            </div>
        );

       if (this.state.useraccountdata.length === 0) {
           const style = {
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: '18px'
           };
         display = (<p style = {style} > {this.state.result} </p>);
        }

        return (<>
                    <div className={classes.banner} >
                        <div className={classes.bannerText}>
                            My Orders
                        </div>
                    </div>
                    <div className={classes["form-wrap"]}>
                        <h1>Your Order History</h1>
                        <h6>To get the result on your processed orders, click the report link.</h6>
                        {display}
                    </div>

                </>
                );
        }
    }

export default WithContext(myaccount);
