import { combineReducers } from 'redux';
import cart from './cart';
import userSettings from './settings'

export default combineReducers({
  cart,
  userSettings
})