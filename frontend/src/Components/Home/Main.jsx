import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";

import styles from "./Main.module.css";

import { ReactComponent as Driver } from "./svg/driver.svg";
import { ReactComponent as Vendor } from "./svg/vendor1.svg";
import { useSelector } from "react-redux";

function Main() {
  const { auth, role } = useSelector((state) => state.auth);
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.upperContainer}>
          <Typography variant="h4">Choose any one of the mode below</Typography>
        </div>
        <div className={styles.middleContainer}>
          <Slide left>
            <h1>Vendor</h1>
          </Slide>
          <Slide right>
            <h1>Driver</h1>
          </Slide>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.cards}>
            <div>
              {auth && role === "user" ? (
                <Link to="/vendorDash">
                  <Vendor className={styles.personIcon} />
                </Link>
              ) : (
                <Link to="/vendorSignUp">
                  <Vendor className={styles.personIcon} />
                </Link>
              )}
            </div>
            <div>
              {auth && role === "driver" ? (
                <Link to="/driverDash">
                  <Driver className={styles.directionsIcon} />
                </Link>
              ) : (
                <Link to="/driverSignUp">
                  <Driver className={styles.directionsIcon} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
