import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";
import { logout } from "../../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";

export const NavHome = () => {
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.home_container}>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};
