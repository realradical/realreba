import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";


import Layout from './hoc/Layout/Layout'
import HomeContent from './containers/HomeContent/HomeContent';
import AboutUs from "./containers/AboutUs/AboutUs";
import Login from "./containers/Login/Login";
import AppProvider from "./components/AppProvider"




class App extends Component {
  render() {
    return (
        <AppProvider>
            <BrowserRouter>
              <div>
                <Layout>
                    <Route path="/" exact component={HomeContent}/>
                    <Route path="/about-us" exact component={AboutUs}/>
                    <Route path="/authentication" exact component={HomeContent}/>
                    <Route path="/login" exact component={Login}/>
                </Layout>
              </div>
            </BrowserRouter>
        </AppProvider>
    );
  }
}

export default App;
