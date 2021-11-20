import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { VendorSignUp } from "../Components/Registration/VendorSignUp";
import { DriverSignUp } from "../Components/Registration/DriverSignUp";
import { LoginPage } from "../Pages/LoginPage/LoginPage";

export const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/vendorSignUp">
          <VendorSignUp />
        </Route>
        <Route path="/driverSignUp">
          <DriverSignUp />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
};
