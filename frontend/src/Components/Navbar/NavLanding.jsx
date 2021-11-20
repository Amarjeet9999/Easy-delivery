import React from "react";
import styles from "./Nav.module.css";
import { useHistory } from "react-router-dom";

export const NavLanding = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div className={styles.landing_container}>
      <button>Contact</button>
      <button>FAQ</button>
      <button>Home</button>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
};
