import styles from "./Footer.module.css";

function Footer() {
  return (
    <div style={{ backgroundColor: "#f0f2f7" }}>
      <p className={styles.heading}>Areas we are also accessible in...</p>
      <div className={styles.footer}>
        <div>
          <p>Pune</p>
          <p>Aurangabad</p>
          <p>Mumbai</p>
          <p>Delhi</p>
          <p>Chennai</p>
          <p>Jaipur</p>
        </div>
        <div>
          <p>Amaravati</p>
          <p>Chittoor</p>
          <p>Guntur</p>
          <p>Tirupati</p>
          <p>Visakhapatnam</p>
          <p>Vizianagaram</p>
        </div>
        <div>
          <p>Jamnagar</p>
          <p>Dwarka</p>
          <p>Ahmadabad</p>
          <p>Surat</p>
          <p>Rajkot</p>
          <p>Valsad</p>
        </div>
        <div>
          <p>Ujjain</p>
          <p>Akola</p>
          <p>Nagpur</p>
          <p>Nashik</p>
          <p>Thane</p>
          <p>Ulhasnagar</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
