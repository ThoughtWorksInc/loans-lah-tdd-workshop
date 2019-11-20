import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {createBrowserHistory} from "history";

const history = createBrowserHistory();
ReactDOM.render(<App history={history} />, document.getElementById('root'));
