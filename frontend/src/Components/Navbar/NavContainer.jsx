import React from "react";
import styles from "./Nav.module.css";
import { NavLanding } from "./NavLanding";
import { NavHome } from "./NavHome";
import { NavClient } from "./NavClient";
import { useHistory } from "react-router-dom";

export const NavContainer = ({ user, page }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.left_nav}>
        <div className={styles.logo} onClick= {()=>history.push("/")}>
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
        {page ? <NavHome /> : <NavLanding />}
      </div>
    </div>
  );
};
