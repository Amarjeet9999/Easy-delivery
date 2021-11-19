import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";

import styles from "./Main.module.css";

import { ReactComponent as Driver } from "./svg/driver.svg";
import { ReactComponent as Vendor } from "./svg/vendor1.svg";
function Main() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.upperContainer}>
          <Typography variant="h4">Choose any one of the mode below</Typography>
        </div>
        <div className={styles.middleContainer}>
          <h1>Vendor</h1>
          <h1>Driver</h1>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.cards}>
            <Link to="/vendorSignUp">
              <Slide left>
                <div>
                  <Vendor className={styles.personIcon} />
                </div>
              </Slide>
            </Link>
            <Link to="/driverSignUp">
              <Slide right>
                <div>
                  <Driver className={styles.directionsIcon} />
                </div>
              </Slide>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
