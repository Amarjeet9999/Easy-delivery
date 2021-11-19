import React from "react";
import styles from "./LoginPage.module.css";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginLoading,
  loginSuccess,
  loginError,
} from "../../Redux/Auth/action.js";

export const LoginPage = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  // const { auth, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Function for login
  const handleClick = async () => {
    let { email, password } = data;
    try {
      dispatch(loginLoading());
      console.log(email, password);
      await axios
        .post("http://localhost:5000/user-login", {
          email: email,
          password: password,
        })

        .then((res) => {
          const action = loginSuccess(res.data);
          dispatch(action);
          localStorage.setItem("user", JSON.stringify(res.data));
        });
    } catch (err) {
      const action = loginError("wrong credentials");
      dispatch(action);
    }
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
