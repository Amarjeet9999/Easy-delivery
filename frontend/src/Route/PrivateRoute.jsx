import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { DriverDash } from "../Pages/DriverDashboard/DriverDash";
import { VendorDashBoard } from "../Components/VendorDashBoard/VendorDashBoard";

export const PrivateRoute = ({ exact, children, path,to }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <Route exact={exact} path={path}>
        {children}
      </Route>
    </div>
  );
};
