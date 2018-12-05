import React, {Component} from 'react';

import WithContext from "../../hoc/WithContext";
import classes from "./Authentication.module.css";

import BannerImg from "../../assets/images/test_authBanner.jpg";



class Authentication extends Component {
    state = {
        toggleActive: "Login"
    };

    render() {
        return (
            <>
                <div className={classes.banner}>
                    {<img src={BannerImg} alt='Home Content'/>}
                </div>
                <div className={classes["menu-wrap"]}>
                    <div className={classes["menu-toggle"]}>
                        <div className={this.state.toggleActive==='Signup' ?
                            [classes["toggle-option"],
                                classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}>
                            Recent Work
                        </div>
                        <div className={this.state.toggleActive==='Login' ? [classes["toggle-option"],
                            classes["toggle-option-active"]].join(" ") : classes["toggle-option"]}
                        >Login</div>
                    </div>
                </div>

            </>
        );
    }
}

export default WithContext(Authentication);