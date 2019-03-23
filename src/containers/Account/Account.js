import React , {Component}  from 'react';
import {db} from "../../firebase/firebase";
import classes from "./Account.module.css";
import img from "../../assets/images/test_authBanner.jpg";
import {CardHeader, CardText } from 'reactstrap';

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
                    temp_doc.orderid = 'https://www.authwork.com/report/' + doc.id;
                    userdata.push(temp_doc);
                    const num = String(userdata.length - 1);
                    userdata[num].createdAt = String(Date(userdata[num].createdAt));
                    const time_data = userdata[num].createdAt.split(" ");
                    userdata[num].createdAt = "   " + time_data[1] + "-" + time_data[2] + "-" + time_data[3] + "   ";
                    userdata[num].button_status = userdata[num].status !== "processed";
                    if (userdata[num].status === "processed"){
                        userdata[num].button_color  = "blue";
                        userdata[num].text_color = "white"
                    }else{
                        userdata[num].button_color ="grey";
                        userdata[num].text_color = "black"
                    }
                });
                this.setState({useraccountdata: userdata});

            } else {
                this.setState({result: "You dont have any orders yet."});
            }
        }).catch(function(error) {
            console.log("Error getting documents:", error);
        });}

    render() {
        let userlist =  this.state.useraccountdata.map(item => {
            const style_button = {
                backgroundColor : item.button_color,
                color: item.text_color};
            return <>
                <CardHeader tag="h5">Date : {item.createdAt} </CardHeader>
                <div className={classes.wrapper}>
                <div className={classes.first}>
                <CardText>
                        Sneaker : {item.itemName}
                        <br/>
                        Description : {item.description}
                        <br/>
                        Status: {item.status}
                </CardText>
                </div>
                <div className={classes.second}>

                    <form action={item.orderid}  target="_blank">
                                <button style={style_button} disabled = {item.button_status}
                                 type="submit">Report</button>
                    </form>
                 </div>
                 </div>
                    </>
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
                <div className={classes.banner}>
                <img src = {img} alt = "text" /> </div>
                <div className={classes.header}> <h1> My Account </h1> </div>

                {display}

                <br/>
                <br/>
                </>
                );
        }
    }

export default WithContext(myaccount);
