import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ to, path, exact, children }) => {
  const { auth, role } = useSelector((state) => state.auth);

  if (auth && role === "user") {
    return <Redirect to="vendorDash"></Redirect>;
  } else if (auth && role === "driver") {
    return <Redirect to="driverDash"></Redirect>;
  }
  
  return (
    <div>
      <Route exact={exact} path={path}>
        {children}
      </Route>
    </div>
  );
};
