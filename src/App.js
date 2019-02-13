import React, { Component } from 'react';
import {Route, Switch, withRouter} from "react-router-dom";


import Layout from './hoc/Layout/Layout';
import HomeContent from './containers/HomeContent/HomeContent';
import AboutUs from "./containers/AboutUs/AboutUs";
import Login from "./containers/Login/Login";
// import Faq from "./containers/FAQ/Faq";
import Account from "./containers/Account/Account";
import Error from "./containers/ErrorPage/ErrorPage";
import PrivateRoute from "./hoc/PrivateRoute";
import Authentication from "./containers/Authentication/Authentication";
import WithContext from "./hoc/WithContext";




class App extends Component {

    componentWillMount() {
        this.unlisten = this.props.history.listen(() => {
            this.props.context.clearMessage();
        });
    };

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
    return (
        <Layout>
            <Switch>
                <Route path="/about-us" component={AboutUs}/>
                {/*<Route path="/Faq" component={Faq}/>*/}
                <Route path="/authentication"  component={Authentication}/>
                <Route path="/login" render={() => <Login redirect/>}/>
                <PrivateRoute path="/myaccount" component={Account}/>
                <Route path="/" exact component={HomeContent}/>
                <Route component={Error}/>
            </Switch>
        </Layout>
    );
    }
}

export default WithContext(withRouter(App));
