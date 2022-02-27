import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from 'react-redux'
import configureStore from './redux/store';
import App from "./App";
import DataCollector from "./DataCollector";
import reportWebVitals from "./reportWebVitals";
import { api } from "./redux/actions/baseAction";

import './shim.js';
import './fonts/roboto/Roboto-Regular.ttf';
import './fonts/roboto/Roboto-Black.ttf';
import './fonts/roboto/Roboto-Thin.ttf';

const store = configureStore();

// Wait for the backend to become available.
const interval = setInterval(() => {
    fetch(`${api}/ping`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            clearInterval(interval);
            DataCollector(store);
        })
        .catch(console.log);
}, 3000);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
