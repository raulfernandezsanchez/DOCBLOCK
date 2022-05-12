import React from "react";
import {render} from "react-dom";
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');
render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
