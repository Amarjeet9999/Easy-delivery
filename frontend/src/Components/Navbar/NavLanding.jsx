import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";

export const NavLanding = () => {
  return (
    <div className={styles.landing_container}>
      <Button variant="contained">Log in</Button>
    </div>
  );
};
