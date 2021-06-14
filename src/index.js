import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './App.css';
import Game from "./Game";
import store from "./store";

const app = (
    <Provider store={store}>
        <Game size={10} />
    </Provider>
)
ReactDOM.render(app, document.getElementById("root"));

