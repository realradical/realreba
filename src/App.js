import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";


import Layout from './hoc/Layout/Layout'
import HomeContent from './containers/HomeContent/HomeContent';
import AboutUs from "./containers/AboutUs/AboutUs";
import Login from "./containers/Login/Login";
import Error from "./containers/ErrorPage/ErrorPage"
import AppProvider from "./components/AppProvider"


class App extends Component {
  render() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/about-us" component={AboutUs}/>
                        <Route path="/authentication"  component={HomeContent}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/" exact component={HomeContent}/>
                        <Route component={Error}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AppProvider>
    );
  }
}

export default App;
