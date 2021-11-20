import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavContainer } from "../../Components/Navbar/NavContainer";
import styles from "./DriverDash.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const DriverJobs = () => {
  const [driver, setDriver] = React.useState("");
  // console.log("Hello");

  const fetchUser = async () => {
    let userId = JSON.parse(localStorage.getItem("user"));
    await axios
      .get(`http://localhost:5000/driver/${userId?.user?._id}`)
      .then((res) => {
        setDriver(res.data.data[0]);
      });
  };

  const declineJob = async (id) => {
    let userId = JSON.parse(localStorage.getItem("user"));
    await axios
      .patch(`http://localhost:5000/driver/remove/${userId?.user?._id}`, {
        jobs: [id],
      })
      .then((res) => {
        // console.log(res.data);
        fetchUser();
      });
    return await axios
      .patch(`http://localhost:5000/package/${id}`, {
        driverId: userId?.user?._id,
      })
      .then((res) => console.log(res.data));
  };

  React.useState(() => {
    fetchUser();
  }, []);
  // console.log("Driver", driver);

  return (
    <div className={styles.jobs_container}>
      <NavContainer page="home" />
      <div className={styles.sections}>
        <span>
          <Link to="/driverDash">New Vendors</Link>
        </span>
        <span>
          <Link to="driverJobs">Accepted Vendors</Link>
        </span>
      </div>
      <div className={styles.jobs_sub_container}>
        {driver !== "" &&
          driver?.jobs.map((e) => {
            return (
              <div key={e._id} className={styles.list}>
                <div>
                  <div className={styles.route}>
                    <div className={styles.text}>
                      <span>From : </span>
                      <span>{e?.from}</span>
                    </div>
                    <div className={styles.text}>
                      <span>Destination : </span>
                      <span>{e?.to}</span>
                    </div>
                  </div>
                  <div className={styles.text}>
                    <span>Item : </span>
                    <span>{e?.packageName}</span>
                  </div>
                  <div className={styles.text}>
                    <span>Weight : </span>
                    <span>{e?.weight}</span>
                  </div>
                </div>
                <div className={styles.image}>
                  <img src={e?.image} alt="" />
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    declineJob(e?._id);
                  }}
                  style={{ backgroundColor: "#6C63FF" }}
                >
                  Decline
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
