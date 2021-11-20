import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export const NavLanding = () => {

  const history = useHistory();

  const handleClick = () => {
    history.push("/login")
  }

  return (
    <div className={styles.landing_container}>
      <Button variant="contained" onClick = {handleClick}>Log in</Button>
    </div>
  );
};
