import { Typography } from "@mui/material";

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
            <div>
              <Vendor className={styles.personIcon} />
            </div>
            <div>
              <Driver className={styles.directionsIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
