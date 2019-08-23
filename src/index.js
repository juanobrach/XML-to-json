import "core-js";
import 'react-app-polyfill/ie11';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.scss";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
