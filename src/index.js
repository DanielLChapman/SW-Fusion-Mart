import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Router from "./components/Router";
import "./css/style.css";

const store = createStore(rootReducer)

render(
  <Router store={store} />,
  document.getElementById('root')
)