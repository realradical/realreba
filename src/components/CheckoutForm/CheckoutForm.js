import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button, Form, FormGroup, Label, Input, Progress } from 'reactstrap';
import {storage} from "../../firebase/firebase";
import mime from 'react-native-mime-types';


import Api from "axios";
import Spinner from "../Spinner/Spinner";
import "./StripeElement.css";
import WithContext from "../../hoc/WithContext";
import FlashMessage from "../FlashMessage/FlashMessage";
import classes from "./CheckoutForm.module.css";


class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    _isMounted = false;
    _isSubmitted = false;

    state = {
        paymentSuccess: false,
        loading: false,
        holderName: '',
        valid: false,
        uploadStatus: '',
    };

    componentWillUnmount() {
        this.props.context.clearMessage();
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
    };

    startLoading = () => {
        this.setState({loading: true});
    };

    endLoading = () => {
        this.setState({loading: false});
    };

    uploadImageAsPromise = (orderId, label, imageFile) => {
        return new Promise((resolve, reject) => {
            const extension = mime.extension(imageFile.type);

            let storageRef = storage.ref().child(`orders/${orderId}/${label}.${extension}`);

            let task = storageRef.put(imageFile);

            task.on('state_changed', (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (this._isMounted) {
                    this.setState({[label + 'Percentage']: progress.toFixed(0)});
                }
            }, function(error) {
                // Handle unsuccessful uploads
                reject(error);
            }, function() {
                resolve('upload finish');
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            });

        })
    };

    async submit(event) {
        event.preventDefault();

        let valid = this.state.holderName !== '';
        this.setState({valid});
        this._isSubmitted = true;

        if (valid) {
            const {token} = await this.props.stripe.createToken({name: this.state.holderName});
            const uid = this.props.context.state.currentUser.uid;
            this.startLoading();

            Api.post("/charge/", {token,uid})
                .then(res => {
                    if (this._isMounted) {
                        this.setState({paymentSuccess: true});
                        this.endLoading();

                        Promise.all(this.props.state.dropItems.filter(item => item.hasFile).map(async (item) => {
                            const content = await this.uploadImageAsPromise(res.data.body.orderId, item.label, item.file) ;
                            return content;
                        })).then(values => {
                            if (this._isMounted) {
                                this.setState({uploadStatus: 'finish'});
                            }
                            })
                            .catch((err) => {
                                if (this._isMounted) {
                                    this.setState({uploadStatus: 'fail'});
                                }
                            });
                    }
                })
                .catch(err => {
                    if (this._isMounted) {
                        this.props.context.setMessage("Something went wrong, please check your card details.");
                        this.endLoading();
                    }
                });
        }
    }

    onTypeInputItemName = (e) => {
        this.setState({holderName:e.target.value});
    };

    render() {
        let valid = this._isSubmitted ? this.state.holderName !== '' : true;
        const checkOut = (
            <Form>
                <FormGroup>
                    <Label for="holderName">Cardholder Name</Label>
                    <Input type="text"
                           onChange = {this.onTypeInputItemName}
                           name="holderName" id="holderName"
                           placeholder="Full name (on card)"
                           invalid={!valid}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="cardDetails">Credit or Debit Card</Label>
                    <CardElement id="cardDetails"
                                 style={{
                                     base: {
                                         fontSize: '16px',
                                         fontFamily: '-apple-system,"Ubuntu", sans-serif, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n' +
                                             '    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue" '
                                     }
                                 }}/>
                    <FlashMessage/>
                </FormGroup>

                <FormGroup style={{textAlign:'center'}}>
                    <Button onClick={this.submit} block size="lg" color="info">Pay</Button>
                </FormGroup>
            </Form>
        );

        let uploadingText = (<p>Please wait, uploading pictures:</p>);
        if (this.state.uploadStatus === 'finish') {
            uploadingText = (<p>Uploading finish, we will process your order as soon as possible.</p>);
        } else if (this.state.uploadStatus === 'fail') {
            uploadingText = (<p>Uploading failed, please contact our support team.</p>);
        }

        const paymentSuccess = (
            <div>
                <div className={classes.title}>
                    <span>Payment Complete</span>
                    {uploadingText}
                </div>
                <ol>
                {this.props.state.dropItems.filter(item => item.hasFile)
                    .map(item => (
                        <li key={item.label}>
                            <Progress
                                className={classes.progress}
                                striped
                                value= {this.state[`${item.label}Percentage`]}
                                >{this.state[`${item.label}Percentage`]}%
                            </Progress>
                        </li>
                        )
                    )
                }
                </ol>
            </div>
        );

        return (
            this.state.loading ? (<Spinner/>) : (this.state.paymentSuccess ? paymentSuccess : checkOut)
        );
    }
}

export default injectStripe(WithContext(CheckoutForm));
