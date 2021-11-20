import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ to, path, exact, children }) => {
  const { auth } = useSelector((state) => state.auth);
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
