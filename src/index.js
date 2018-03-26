import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Router from "./components/Router";
import "./css/style.css";

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)