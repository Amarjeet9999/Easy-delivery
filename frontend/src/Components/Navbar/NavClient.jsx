import React from "react";
import styles from "./Nav.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { locationSuccess, locationLoading } from "../../Redux/Location/action";
const ipLocation = require("iplocation");

export const NavClient = () => {
  const [autoLoco, setAutoLoco] = useState("");
  // const [userLoco, setUserLoco] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();

  async function search() {
    let userLoco = document.querySelector("input").value;
    console.log(userLoco);
    if (userLoco.length <= 2) {
      return false;
    }
    await fetch(`http://localhost:5000/${userLoco}`)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  const debounce = () => {
    let interval;
    return function () {
      clearTimeout(interval);
      interval = setTimeout(() => {
        search();
      }, 500);
    };
  };

  const y = debounce();
  const handleClick = (e) => {
    // console.log(userLoco);
  };

  const getLocation = async () => {
    let temp = JSON.parse(localStorage.getItem("myIp"));
    await ipLocation(temp).then(({ city }) => {
      setAutoLoco(city);
      // dispatch(locationSuccess(city));
      console.log("autoLocation", autoLoco);
    });
  };

  useEffect(() => {
    // dispatch(locationLoading());
    axios.get("https://geolocation-db.com/json/").then((res) => {
      localStorage.setItem("myIp", JSON.stringify(res.data.IPv4));
      setIsLoading(false);
    });

    if (!isLoading) getLocation();
  });

  return (
    <div className={styles.driver_nav_container}>
      <div className={styles.input_box}>
        <input
          type="text"
          placeholder="Enter Source"
          // value={userLoco}
          onChange={(e) => {
            // setUserLoco(e.target.value);
            y();
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
