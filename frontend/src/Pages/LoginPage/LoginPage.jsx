import React from "react";
import styles from "./LoginPage.module.css";
import { Button } from "@mui/material";
import { useState } from "react";

export const LoginPage = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = () => {
    // console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.input_box}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_box}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.button_box}>
          <Button
            variant="contained"
            size="medium"
            style={{ width: "100%" }}
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};
