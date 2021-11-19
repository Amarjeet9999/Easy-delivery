import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { VendorSignUp } from "../Components/Registration/VendorSignUp";
import { DriverSignUp } from "../Components/Registration/DriverSignUp";
import { NavContainer } from "../Components/Navbar/NavContainer";

export const Router = () => {
  return (
    <div>
      <NavContainer page={"home"} />
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
      </Switch>
    </div>
  );
};
