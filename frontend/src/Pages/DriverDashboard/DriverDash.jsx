import React from "react";
import { NavContainer } from "../../Components/Navbar/NavContainer";
import Pusher from "pusher-js";
import axios from "axios";
import styles from "./DriverDash.module.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const DriverDash = () => {
  const [data, setData] = React.useState([]);
  const { user } = useSelector((state) => state.auth);

  const fetchData = async () => {
    await axios.get("http://localhost:5000/package").then((res) => {
      console.log("Called");
      setData(res.data.data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const pusher = new Pusher("4bdbd330c1135b572cd7", {
      cluster: "ap2",
      encrypted: true,
    });
    const channel = pusher.subscribe("package");
    channel.bind("inserted", (el) => {
      setData([...data, el]);
    });

    channel.bind("updated", (el) => {
      setData(
        data.map((e) => {
          return e._id === el.id ? { ...e, status: el.status } : e;
        })
      );
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  const handleClick = async (id) => {
    let userId = JSON.parse(localStorage.getItem("user"));
    await axios
      .patch(`http://localhost:5000/package/${id}`, {
        driverId: userId?.user?._id,
      })
      .then((res) => {
        // console.log(res.data);
      });
    await axios
      .patch(`http://localhost:5000/driver/${user._id}`, {
        jobs: [id],
      })
      .then((res) => {
        //  console.log("Whole data", data[0].status);
      });
  };

  console.log(data);

  return (
    <div className={styles.container}>
      <NavContainer user={"driver"} page={"home"} />
      {/* <Button variant>Driver Jobs</Button> */}
      <div className={styles.sections}>
        <span>
          <Link to="/driverDash">New Vendors</Link>
        </span>
        <span>
          <Link to="driverJobs">Accepted Vendors</Link>
        </span>
      </div>
      <div className={styles.sub_container}>
        {data
          ?.filter((el) => !el.status)
          .map((el) =>
            el.status ? null : (
              <div className={styles.list}>
                <div>
                  <div className={styles.route}>
                    <div className={styles.text}>
                      <span>From : </span>
                      <span>{el?.from}</span>
                    </div>
                    <div className={styles.text}>
                      <span>Destination : </span>
                      <span>{el?.to}</span>
                    </div>
                  </div>
                  <div className={styles.text}>
                    <span>Item : </span>
                    <span>{el?.packageName}</span>
                  </div>
                  <div className={styles.text}>
                    <span>Weight : </span>
                    <span>{el?.weight}</span>
                  </div>
                </div>
                <div className={styles.image}>
                  <img src={el?.image} alt="" />
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClick(el?._id);
                  }}
                >
                  Accept
                </Button>
              </div>
            )
          )}
      </div>
    </div>
  );
};
