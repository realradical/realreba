import React,{Component} from 'react';

import { Container, Row, Col } from 'reactstrap/lib';
import Image from "./Image/Image";
import Spinner from "../Spinner/Spinner";
import {db, storage} from "../../firebase/firebase";
import classes from "./RecentWork.module.css";


class RecentWork extends Component {
    _isMounted = false;

    state = {
        loading: true,
        imgArray: []
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        let imgArray = [];

        let storageRef = storage.ref();
        let ordersStorageRef = storageRef.child('orders');

        let ordersDbRef = db.collection("processedOrders");
        let processedOrderQuery = ordersDbRef.orderBy("processedAt","desc").limit(12);
        processedOrderQuery.get().then((querySnapshot) => {
            querySnapshot.forEach(
                (doc) => {
                    let orderStorageRef = ordersStorageRef.child(doc.id + '/thumb_overall.jpg');
                    orderStorageRef.getDownloadURL().then(
                        (response) => {
                            imgArray.push({
                                orderId: doc.id,
                                legit: doc.data().legit,
                                thumbnailLink: response
                            });
                            if (this._isMounted) {
                                this.setState({imgArray: imgArray, loading: false});
                            }
                        });
                }
            );
        });


    }

    render() {
        let rowArray = this.state.imgArray.map(
            (item, index) => {
                return index % 12 === 0 ? this.state.imgArray.slice(index, index + 12) : null;
            }).filter(x => x != null);

        let gallery = rowArray.map(
            (item, index) => {
                return (
                    <Row key={index}>
                        {item.map((i) => (
                            <Col sm={6} md={4} lg={4} xl={3} key={i.orderId} className={classes["col-div"]}>
                                <Image imglink={i.thumbnailLink} legit={i.legit}/>
                            </Col>
                        ))}
                    </Row>
                )
            }
        );


        return (
            <Container className={classes.container}>
                {this.state.loading ? <Spinner/> : null}
                {gallery}
            </Container>
        );
    };
}

export default RecentWork;
