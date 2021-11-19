import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";

const handleLogout = () => {
  alert("Logout");
};

export const NavHome = () => {
  return (
    <div className={styles.home_container}>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};
