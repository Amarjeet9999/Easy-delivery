import React from "react";
import { NavContainer } from "../../Components/Navbar/NavContainer";
import Pusher from "pusher-js";
import axios from "axios";
import styles from "./DriverDash.module.css";
// import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export const DriverDash = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:5000/package").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const pusher = new Pusher("dad35ca4556ca6ecf0c3", {
      cluster: "ap2",
      encrypted: true,
    });
    const channel = pusher.subscribe("package");
    channel.bind("inserted", (el) => {
      setData([...data, el]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  console.log("Data", data);

  return (
    <div className={styles.container}>
      <NavContainer user={"driver"} page={"home"} />
      <div className={styles.sub_container}>
        {data?.map((el) =>
          el.status ? null : (
            <div className={styles.list}>
              <div>
                <div className={styles.route}>
                  <div className={styles.text}>
                    <span>From:</span>
                    <span>{el?.from}</span>
                  </div>
                  <div className={styles.text}>
                    <span>Destination:</span>
                    <span>{el?.to}</span>
                  </div>
                </div>
                <div className={styles.text}>
                  <span>Item: </span>
                  <span>{el?.packageName}</span>
                </div>
                <div className={styles.text}>
                  <span>Weight:</span>
                  <span>{el?.weight}</span>
                </div>
              </div>
              <div className={styles.image}>
                <img src={el?.image} alt="" />
              </div>
              <Button variant="contained">Accept</Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
