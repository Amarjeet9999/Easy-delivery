import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const DriverJobs = () => {
  const [driver, setDriver] = React.useState("");

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
        console.log(res.data);
      });
    return await axios
      .patch(`http://localhost:5000/package/${id}`)
      .then((res) => console.log(res.data));
  };

  React.useState(() => {
    fetchUser();
  }, []);
  console.log("Driver", driver);

  return (
    <>
      {driver !== "" &&
        driver?.jobs.map((e) => {
          return (
            <div key={e._id}>
              <h1>{e.packageName}</h1>;
              <button onClick={() => declineJob(e._id)}>Decline</button>
            </div>
          );
        })}
    </>
  );
};
