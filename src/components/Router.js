import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "./App";
import Cart from "./Cart";
import Checkout from "./Checkout";
import NotFound from "./NotFound";
import UserSettings from "./UserSettings";

const Router = ({store}) => (
	<Provider store={store}>
	  <BrowserRouter>
	    <Switch>
	      <Route exact path="/" component={App} />
	      <Route path="/cart" component={Cart} />
	      <Route path="/checkout" component={Checkout} />
	      <Route path="/settings" component={UserSettings} />
	      <Route path="/monster/monsterName" component={App} />
	      <Route component={NotFound} />
	    </Switch>
	  </BrowserRouter>
  </Provider>
);

export default Router;
