import React from "react";
import styles from "./Nav.module.css";
import { NavLanding } from "./NavLanding";
import { NavHome } from "./NavHome";
import { NavClient } from "./NavClient";

export const NavContainer = ({ user, page }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_nav}>
        {user === "driver" ? <NavClient /> : null}
      </div>
      <div className={styles.right_nav}>
        {page ? <NavHome /> : <NavLanding />}
      </div>
    </div>
  );
};
