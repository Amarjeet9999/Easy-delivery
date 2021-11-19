import styles from "./Banner.module.css";
import { ReactComponent as Delivery1 } from "./svg/delivery1.svg";
import { ReactComponent as Delivery2 } from "./svg/delivery2.svg";

function Banner() {
  return (
    <div className={styles.banner}>
      <Delivery1 />
      <p>Deliver your packages on time, with speed and simplicity!</p>
      <Delivery2 />
    </div>
  );
}

export default Banner;
