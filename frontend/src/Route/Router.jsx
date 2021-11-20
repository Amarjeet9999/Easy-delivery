import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { VendorSignUp } from "../Components/Registration/VendorSignUp";
import { DriverSignUp } from "../Components/Registration/DriverSignUp";
import { LoginPage } from "../Pages/LoginPage/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { DriverDash } from "../Pages/DriverDashboard/DriverDash";
import { NavContainer } from "../Components/Navbar/NavContainer";
import { VendorDashBoard } from "../Components/VendorDashBoard/VendorDashBoard";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginLoading } from "../Redux/Auth/action";
import { DriverJobs } from "../Pages/DriverDashboard/DriverJob";

export const Router = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(loginLoading());
    const data = localStorage.getItem("user");
    if (data !== null) {
      const action = dispatch(loginSuccess(JSON.parse(data)));
      dispatch(action);
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <NavContainer page={auth} />
          <Home />
        </Route>
        <PrivateRoute path="/vendorSignUp">
          <NavContainer page={auth} />
          <VendorSignUp />
        </PrivateRoute>
        <PrivateRoute path="/driverSignUp">
          <NavContainer page={auth} />
          <DriverSignUp />
        </PrivateRoute>
        <PrivateRoute path="/login">
          <NavContainer page={auth} />
          <LoginPage />
        </PrivateRoute>
        <Route path="/driverJobs">
          <DriverJobs />
        </Route>
        <Route path="/driverDash" to="/">
          <DriverDash />
        </Route>
        <Route path="/vendorDash" to="/">
          <NavContainer page={auth} />
          <VendorDashBoard />
        </Route>
      </Switch>
    </div>
  );
};
