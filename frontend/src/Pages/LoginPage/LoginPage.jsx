import React from "react";
import styles from "./LoginPage.module.css";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("user");

  const handleClick = () => {
    const payload = {
      email: email,
      password: password,
      client: client,
    };

    console.log(payload);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.input_box}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_box}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={`${styles.input_box}${styles.radio}`}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="type"
              name="client_type"
              value={client}
              onChange={(e) => {
                setClient(e.target.value);
              }}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User"
                labelPlacement="start"
              />
              <FormControlLabel
                value="driver"
                control={<Radio />}
                label="Driver"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
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
