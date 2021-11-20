import React from "react";
import { NavContainer } from "../../Components/Navbar/NavContainer";
import Pusher from "pusher-js";
import axios from "axios";
// import { useSelector } from "react-redux";

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
    <div>
      <NavContainer user={"driver"} page={"home"} />
      {data?.map((el) => (
        <h1>
          {el?.packageName} {`${el?.status}`}
        </h1>
      ))}
    </div>
  );
};
