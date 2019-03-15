import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import AppProvider from "./components/AppProvider"
import ScrollToTop from "./hoc/ScrollToTop";


ReactDOM.render(
    <AppProvider>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </AppProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

WebFont.load({
    google: {
        families: ['Permanent Marker', 'Ubuntu']
    }
});

serviceWorker.unregister();
