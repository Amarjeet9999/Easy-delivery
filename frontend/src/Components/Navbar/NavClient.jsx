// import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const ipLocation = require("iplocation");

export const NavClient = () => {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [userLoco, setUserLoco] = useState("");

  const handleClick = (e) => {
    console.log(userLoco);
  };

  //   useEffect(() => {
  // axios
  //   .get("https://geolocation-db.com/json/")
  //   .then((res) => {
  // setIp(res.data.IPv4);
  //   })
  //   .then(() => {
  // let { city } = ipLocation(ip);
  // setLocation(city);
  //   })
  //   .finally(console.log(location));
  //   ?.finally(() => {
  //     let { city } = ipLocation(ip);
  //     setLocation(city);
  //     console.log("temp:", city);
  //   });
  //   }, []);

  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((res) => {
      localStorage.setItem("myIp", JSON.stringify(res.data.IPv4));
    });
  }, []);

  return (
    <div className={styles.driver_nav_container}>
      <div className={styles.input_box}>
        <input
          type="text"
          placeholder="Enter Source"
          value={userLoco}
          onChange={(e) => {
            setUserLoco(e.target.value);
          }}
        />
      </div>
      <Button
        variant="contained"
        size="small"
        style={{ borderRadius: "10px", margin: "0% 2%" }}
        onClick={handleClick}
      >
        Enter
      </Button>
    </div>
  );
};
