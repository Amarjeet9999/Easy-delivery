import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { VendorSignUp } from "../Components/Registration/VendorSignUp";
import { DriverSignUp } from "../Components/Registration/DriverSignUp";
import { LoginPage } from "../Pages/LoginPage/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { DriverDash } from "../Pages/DriverDashboard/DriverDash";
import { NavContainer } from "../Components/Navbar/NavContainer";

export const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/vendorSignUp">
          <NavContainer page="landing" />
          <VendorSignUp />
        </Route>
        <Route path="/driverSignUp">
          <NavContainer page="landing" />
          <DriverSignUp />
        </Route>
        <Route path="/login">
          <NavContainer page="landing" />
          <LoginPage />
        </Route>
        <PrivateRoute path="/driverDash" to="/">
          <DriverDash />
        </PrivateRoute>
      </Switch>
    </div>
  );
};
