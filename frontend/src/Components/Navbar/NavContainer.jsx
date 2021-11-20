import React from "react";
import styles from "./Nav.module.css";
import { NavLanding } from "./NavLanding";
import { NavHome } from "./NavHome";
import { NavClient } from "./NavClient";

export const NavContainer = ({ user, page }) => {
  console.log("page", page);
  return (
    <div className={styles.container}>
      <div className={styles.left_nav}>
        <div className={styles.logo}>
          <img
            src="https://img.icons8.com/pastel-glyph/64/000000/fast-shipping--v2.png"
            alt="logo"
          />
          <p>
            Ease <span style={{ color: "#6c63ff" }}>-</span> Delivery
          </p>
        </div>

        {user === "driver" ? <NavClient /> : null}
      </div>
      <div className={styles.right_nav}>
        {page === "home" ? (
          <NavHome />
        ) : page === "landing" ? null : (
          <NavLanding />
        )}
      </div>
    </div>
  );
};
