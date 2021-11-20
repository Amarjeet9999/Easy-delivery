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
    const pusher = new Pusher("1a697b90bc54cbe04c2c", {
      cluster: "ap2",
      encrypted: true,
    });
    const channel = pusher.subscribe("package");
    channel.bind("inserted", (el) => {
      setData([...data, el]);
    });

    channel.bind("updated", (el) => {
      console.log(el);
      setData(
        data.map((e) => {
          return e._id === el.id ? { ...e, status: el.status } : e;
        })
      );
      console.log("Maybe Update", data[0].status);
      console.log("ata", data[0].status);
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
    </div>
  );
};
