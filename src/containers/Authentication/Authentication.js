import React, {Component} from 'react';

import WithContext from "../../hoc/WithContext";
import classes from "./Authentication.module.css";
import BannerImg from "../../assets/images/test_authBanner.jpg";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import RecentWork from "../../components/RecentWork/RecentWork";
import StartAuth from '../../components/StartAuth/StartAuth.js';
import Login from "../Login/Login";





class Authentication extends Component {
    state = {
        toggleActive: "T1"
    };

    clickHandler = (toggleType) => {
        this.setState({toggleActive: toggleType});
    };

    render() {
        let contentComponent = null;
        let buttonCssT1 = classes["toggle-option"];
        let buttonCssT2 = classes["toggle-option"];
        let buttonCssT3 = classes["toggle-option"];

        switch (this.state.toggleActive) {
            case "T1":
                buttonCssT1 = `${classes["toggle-option"]} ${classes["toggle-option-active"]}`;
                contentComponent = (<RecentWork/>);
                break;
            case "T2":
                buttonCssT2 = `${classes["toggle-option"]} ${classes["toggle-option-active"]}`;
                contentComponent = (<HowItWorks/>);
                break;
            case "T3":
                const user = this.props.context.state.currentUser;
                if (user) {
                    contentComponent = (<StartAuth user={user} />)
                }
                else{
                    contentComponent = <Login/>}

                buttonCssT3 = `${classes["toggle-option"]} ${classes["toggle-option-active"]}`;
                break;
            default:

        }

        return (
            <>
                <div className={classes.banner}>
                    {<img src={BannerImg} alt='Home Content'/>}
                </div>
                <div className={classes.content}>
                    <div className={classes["menu-toggle"]}>
                        <div
                            className={buttonCssT1}
                            onClick={()=>this.clickHandler("T1")}
                        >Recent Work
                        </div>
                        <div
                            className={buttonCssT2}
                            onClick={()=>this.clickHandler("T2")}
                        >How It Works
                        </div>
                        <div
                            className={buttonCssT3}
                            onClick={()=>this.clickHandler("T3")}
                        >Start Authentication</div>
                    </div>
                    {contentComponent}
                </div>

            </>
        );
    }
}

export default WithContext(Authentication);