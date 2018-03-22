import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";
import Checkout from "./Checkout";
import NotFound from "./NotFound";
import UserSettings from "./UserSettings";

const Router = () => (
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
);

export default Router;