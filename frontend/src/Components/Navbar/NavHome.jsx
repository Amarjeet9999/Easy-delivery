import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";
import { logout } from "../../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const NavHome = () => {
  // const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("user");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.home_container}>
      <button>Contact</button>
      <button>FAQ</button>
      <button>Home</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
