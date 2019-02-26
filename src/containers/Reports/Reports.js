import React , {Component}  from 'react';
import { db, storage } from "../../firebase/firebase";
import classes from './Report.module.css';
import legit from '../../assets/images/legit_1.png';
import fake from '../../assets/images/legit_1.png';
import Spinner from "../../components/Spinner/Spinner";



class reports extends Component {
    state = {
        header : <Spinner/>,
        orderdata : [],
        validfile : null,
        fake_legit : null,
        status  : null,
        bckimg1 : null,
        bckimg2 : null,
        bckimg3 : null,
        bckimg4 : null,
        bckimg5 : null,
        bckimg6 : null,
        loading : true

    };

    componentDidMount() {

    const {match: {params}} = this.props;
    console.log(params.id);

    const docRef = db.collection("orders").doc(params.id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            this.setState({orderdata : doc.data()});

            if (this.state.orderdata.status === "processed") {
                const docRef2 = db.collection("processedOrders").doc(params.id);
                    docRef2.get().then((doc) => {
                        if (doc.exists) {
                            if (doc.data().legit === true) {
                            this.setState({fake_legit : {legit}})
                            console.log(this.state.fake_legit)
                                }else{
                                this.setState({fake_legit : {fake}})
                                }
                            }
                    })
            this.setState({status : "processed"});

            let storageRef = storage.ref();

            storageRef.child('orders/'+ params.id+'/boxlabel.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg1:imgs})
            });

            storageRef.child('orders/'+ params.id +'/insole.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg2:imgs})
            });

            storageRef.child('orders/'+ params.id +'/itemlabel.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg3:imgs})
            });

            storageRef.child('orders/'+ params.id +'/overall.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg4:imgs})
            });

            storageRef.child('orders/'+ params.id +'/seal.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg5:imgs})
            });

            storageRef.child('orders/'+ params.id +'/stitching.jpeg')
            .getDownloadURL().then((imgs) => {
            this.setState({bckimg6:imgs})
            });

            console.log(this.state.status);

        }
            else{
                this.setState({ validafile : "Your Certificate is yet to be processed"});
                console.log(this.state.status);
            }
        }
        else {
            this.setState({ validafile : "Invalid Certificate Number"});

            // doc.data() will be undefined in this case
            console.log(this.state.validafile);
        }}).catch((error) => {
        console.log("Error getting document:", error);
        });

    };

    render() {
    let header = this.state.header

    if (this.state.status === "processed") {
        let img_area = <>
            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg1} rel="noopener noreferrer">
                    <img src={this.state.bckimg1} alt="Forest" width="600" height="400"/>
                </a>
            </div>

            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg2} rel="noopener noreferrer">
                    <img src={this.state.bckimg2} alt="Forest" width="600" height="400"/>
                </a>
            </div>

            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg3} rel="noopener noreferrer">
                    <img src={this.state.bckimg3} alt="Forest" width="600" height="400"/>
                </a>
            </div>

            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg4} rel="noopener noreferrer">
                    <img src={this.state.bckimg4} alt="Forest" width="600" height="400"/>
                </a>
            </div>

            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg5} rel="noopener noreferrer">
                    <img src={this.state.bckimg5} alt="Forest" width="600" height="400"/>
                </a>
            </div>

            <div className={classes.gallery}>
                <a target="_blank" href={this.state.bckimg6} rel="noopener noreferrer">
                    <img src={this.state.bckimg6} alt="Forest" width="600" height="400"/>
                </a>
            </div>
            <div className={classes.layer4}>
                <img src={legit} width="100" height="80" alt="fake_or_legit"/>
            </div>
        </>;

        let header = (
            <div className={classes.outerWrap}>
                <div className={classes.layer1}>
                    {/*<h3> {this.state.orderdata.itemName} </h3>*/}
                    <h3> CERTIFICATE OF AUTHENTICATION</h3>
                    <div className={classes.layer2}>
                        <p> {this.state.orderdata.itemName}
                        </p>
                        <div className={classes.layer3}>
                            {img_area}
                        </div>
                    </div>
                </div>
            </div>);
        return (header)}
        if (this.state.status !== "processed"){
        const style = {
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: '18px'
           };
         header = (<p style = {style} > {this.state.validafile} </p>);
        }
        return (<>
                {header}
                </>
        );
    }
}

export default reports;



