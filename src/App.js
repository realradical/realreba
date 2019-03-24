import React, { Component } from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import { loadReCaptcha } from 'react-recaptcha-v3'


import Layout from './hoc/Layout/Layout';
import HomeContent from './containers/HomeContent/HomeContent';
import AboutUs from "./containers/AboutUs/AboutUs";
import Login from "./containers/Login/Login";
import Faq from "./containers/FAQ/Faq";
import Orders from "./containers/Account/Account";
import Report from "./containers/Reports/Reports";
import Error from "./containers/ErrorPage/ErrorPage";
import PrivateRoute from "./hoc/PrivateRoute";
import Authentication from "./containers/Authentication/Authentication";
import ContactUs from "./containers/ContactUs/ContactUs";
import SignedInRoute from "./hoc/SignedInRoute";


import Privacy from "./containers/Privacy/Privacy";

import WithContext from "./hoc/WithContext";



class App extends Component {

    constructor(props) {
        super(props);
        this.unlisten = this.props.history.listen(() => {
            this.props.context.clearMessage();
        });
    };

    componentDidMount() {
        loadReCaptcha("6LenfZMUAAAAAEBOZexD6GwokA2Gyav_QokiEs6C");
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
    return (
        <Layout>
            <Switch>
                <Route path="/about-us" exact component={AboutUs}/>
                <Route path="/faq" exact component={Faq}/>
                <Route path="/privacy" exact component={Privacy}/>
                <Route path="/contact-us" exact component={ContactUs}/>
                <Route path="/authentication" exact component={Authentication}/>
                <Route path="/report" exact component={Report}/>
                <Route path="/authentication/:id" component={Authentication}/>
                <Route path="/report/:id" component={Report}/>
                <SignedInRoute path="/login" exact component={Login}/>
                <PrivateRoute path="/myorders" exact component={Orders}/>
                <Route path="/" exact component={HomeContent}/>
                <Route component={Error}/>
            </Switch>
        </Layout>
    );
    }
}

export default WithContext(withRouter(App));
