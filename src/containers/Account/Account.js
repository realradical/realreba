import React , {Component}  from 'react';
import {db} from "../../firebase/firebase";
import classes from "./Account.module.css";
import img from "../../assets/images/test_authBanner.jpg";
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
          if(results.empty) {
            this.setState({result: "You dont have any orders yet."});
          } else {
            // go through all results
            results.forEach((doc) => {
                userdata.push(doc.data())
            });
            // or if you only want the first result you can also do something like this:
              this.setState({useraccountdata: userdata});
          }
        }).catch(function(error) {
            console.log("Error getting documents:", error);
        });
        }

    render() {
        let userlist =  this.state.useraccountdata.map(item => {
            return (
                 <>
                <tr>
                    <td>{item.itemName}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>{item.uid}</td>
                </tr>
                 </>)
        });

        let display = (
            <div className={classes.textblock}>
                <table>
                <thead>
                <tr>
                    <th>Order Name</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Order Result</th>
                </tr>
                </thead>
                <tbody>
                    {userlist}
                </tbody>
                </table>
            </div>

        );

       if (this.state.useraccountdata.length == 0) {
           const style = {
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: '18px'
           }
         display = (<p style = {style} > {this.state.result} </p>);
        };

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
