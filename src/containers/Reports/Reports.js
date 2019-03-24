import React , {Component}  from 'react';
import { db, storage } from "../../firebase/firebase";

import ErrorPage from "../../containers/ErrorPage/ErrorPage"
import classes from './Report.module.css';
import legitStamp from '../../assets/images/Main_Legit.png';
import fakeStamp from '../../assets/images/Main_Fake.png';
import {Col, Container, Row} from "reactstrap/lib";
import labelIcon from "../../assets/images/icon_label.png";


class reports extends Component {
    state = {
        redirect: false,
        legit: null,
        imgArray: [],
        itemName: null

    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        const {match: {params}} = this.props;

        if (params.id !== undefined) {
            const docRef = db.collection("orders").doc(params.id);

            docRef.get().then((orderdoc) => {
                if (orderdoc.exists) {
                    const processedOrdersRef = db.collection("processedOrders").doc(params.id);
                    processedOrdersRef.get().then((doc) => {
                        if (doc.exists) {
                            let imgArray = [];
                            const storageRef = storage.ref();
                            const promise1 = storageRef.child('orders/'+ params.id+'/thumb_overall.jpg').getDownloadURL();
                            const promise2 = storageRef.child('orders/'+ params.id+'/thumb_itemlabel.jpg').getDownloadURL();
                            const promise3 = storageRef.child('orders/'+ params.id+'/thumb_stitching.jpg').getDownloadURL();
                            const promise4 = storageRef.child('orders/'+ params.id+'/thumb_insole.jpg').getDownloadURL();
                            const promise5 = storageRef.child('orders/'+ params.id+'/thumb_boxlabel.jpg').getDownloadURL();
                            const promise6 = storageRef.child('orders/'+ params.id+'/thumb_seal.jpg').getDownloadURL();
                            Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then(results => {
                                results.forEach(result => imgArray.push(result));
                                if (this._isMounted) {
                                    this.setState({
                                        legit: doc.data().legit,
                                        redirect: false,
                                        imgArray: imgArray,
                                        itemName: orderdoc.data().itemName
                                    })
                                }
                            }).catch(err => console.log("Error getting image URLs:", err));

                        } else {
                            if (this._isMounted) {
                                this.setState({
                                    redirect: true
                                })
                            }
                        }
                    }).catch(err => console.log("Error getting processedOrders document:", err));
                } else {
                    if (this._isMounted) {
                        this.setState({
                            redirect: true
                        })
                }}
            }).catch((error) => {
                    console.log("Error getting orders document:", error);
                });
        } else {
            if (this._isMounted) {
                this.setState({redirect: true})
            }
        }
    };

    render() {
        let imgArray = this.state.imgArray;
        let stamp = this.state.legit ? legitStamp : fakeStamp;
        let reportName = this.state.legit ? "CERTIFICATE OF AUTHENTICITY" : "Authentication Report";

        let gallery = imgArray.map(
            (item, index) => {
                return(
                    <Col sm={6} md={4} lg={4} xl={4} key={index} className={classes["col-div"]}>
                        <img src={item}></img>
                    </Col>)
            });



        let report = (
            <div className={classes["form-wrap"]}>
                <div className={classes.title}>
                    <h3> {reportName}</h3>
                    <p> {this.state.itemName}</p>
                    <span className={classes["text-block"]}>
                        <img src={stamp} alt="stamp"/>
                    </span>
                </div>

                <Container className={classes.container}>
                    <Row>
                        {gallery}
                    </Row>
                </Container>

            </div>
        );

        return this.state.redirect ? <ErrorPage/> : report
    }
}

export default reports;



