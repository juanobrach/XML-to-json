import "core-js";
import 'react-app-polyfill/ie11';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
