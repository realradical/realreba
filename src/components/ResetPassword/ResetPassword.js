import React, {
    Component,
    createRef
} from 'react';
import { Button } from 'reactstrap'

import classes from "./ResetPassword.module.css";
import { auth } from '../../firebase/';
import FlashMessage from "../FlashMessage/FlashMessage";
import WithContext from '../../hoc/WithContext';


class ResetPassword extends Component{

    constructor(props) {
        super(props);
        this.email = createRef();
    }

    state = {
        emailSent: false
    }

    componentWillUnmount() {
        this.props.context.clearMessage();
    }

    handleSubmit = (event) => {
        event.preventDefault();

        auth.reset(this.email.current.value).then(() => {
            this.setState({emailSent: true});
        }).catch( err => {
            this.props.context.setMessage(err.message);
        });

    };

    onChangeHandler = () => {
        this.props.context.clearMessage();
    }

    render() {
        let content = (
            <>
                <h2>Send Reset Email</h2>
                <p>Please enter the email address associated with your AuthWork account.</p>
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    ref={this.email}
                    onChange={this.onChangeHandler}
                />
                <FlashMessage/>
                <div>
                    <Button block
                            color="info"
                            size="lg"
                            type="submit" >Send Email</Button>
                </div>
            </>
        );

        if (this.state.emailSent) {
            content = (
                <>
                    <h2>Reset Password Email Sent!</h2>
                    <p>You will receive an email with a link to reset your password.</p>
                </>
            )
        }

        return (
            <form className={classes.resetForm} onSubmit={this.handleSubmit}>
                {content}
            </form>
        );
    }
};

export default WithContext(ResetPassword);
