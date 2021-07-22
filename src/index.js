import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import UserTool from "./components/UserTool";
import UserForm from "./components/UserForm";
import App from "./App";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from './Reducer';
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = [ thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
