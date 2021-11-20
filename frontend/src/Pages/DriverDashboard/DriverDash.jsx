import React from "react";
import { NavContainer } from "../../Components/Navbar/NavContainer";
import Pusher from "pusher-js";
import axios from "axios";
// import { useSelector } from "react-redux";

export const DriverDash = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:5000/package").then((res) => {
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


  return (
    <div>
      <NavContainer user={"driver"} page={"home"} />
    </div>
  );
};
