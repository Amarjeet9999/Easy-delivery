import React from "react";
import styles from "./Nav.module.css";
import { NavLanding } from "./NavLanding";
import { NavHome } from "./NavHome";
import { NavClient } from "./NavClient";

export const NavContainer = ({ page }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_nav}>
        <NavClient />
      </div>
      <div className={styles.right_nav}>
        {page === "home" ? (
          <NavHome />
        ) : page === "landing" ? (
          <NavLanding />
        ) : null}
      </div>
    </div>
  );
};
