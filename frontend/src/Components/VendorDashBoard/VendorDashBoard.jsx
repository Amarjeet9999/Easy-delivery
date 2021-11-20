import axios from "axios";
import React, { useState, useEffect } from "react";
import { storage } from "../Registration/firebase";
import { Wrap } from "./VendorStyle";
import Pusher from "pusher-js";

export const VendorDashBoard = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [wait, setWait] = useState(false);
  const [id, setId] = useState("");
  const [prod, setProd] = useState({});

  console.log(id);
  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  useEffect(() => {
    handleDetails();
  }, []);

  const fileUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`vendors/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("vendors")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  const handleChagne = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalData = { ...data, url: url };
    addPackage(finalData);
  };

  const addPackage = async (el) => {
    console.log(el);
    try {
      await axios
        .post("http://localhost:5000/package", {
          from: el.from,
          to: el.to,
          packageName: el.name,
          image: el.url,
          weight: el.weight,
          status: false,
        })
        .then((res) => {
          localStorage.setItem("package", JSON.stringify(res.data.data));
          setProd(res.data.data);
          waitingData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const waitingData = async () => {
    let id = JSON.parse(localStorage.getItem("package"));
    await axios.get(`http://localhost:5000/package/${id._id}`).then((res) => {
      setProd(res.data.data);
    });
  };

  const handleDetails = async () => {
    await axios.get("http://localhost:5000/package").then((e) => {
      console.log(e.data.data);
    });
  };

  const handleWait = () => {
    setWait(!wait);
  };

  React.useEffect(() => {
    waitingData();
    const pusher = new Pusher("4bdbd330c1135b572cd7", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("package");
    channel.bind("inserted", (el) => {
      setData([...data, el]);
    });

    channel.bind("updated", (el) => {
      // console.log("EL", el);
      // console.log("PROD", prod._id);
      let packageId = JSON.parse(localStorage.getItem("package"));
      if (el.id === packageId._id) {
        let data = { ...prod, status: el.status };
        setData(data);
        console.log("Matched");
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  console.log("Prod", prod._id);

  return (
    <>
      <Wrap>
        <div onClick={handleWait}>Product Detail</div>
        <div onClick={handleWait}>Waiting Area</div>
      </Wrap>
      {!wait ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Product name"
                  onChange={handleChagne}
                />
              </div>
              <div>
                <input
                  name="from"
                  type="text"
                  placeholder="From"
                  onChange={handleChagne}
                />
              </div>
              <div>
                <input
                  name="to"
                  type="text"
                  placeholder="To"
                  onChange={handleChagne}
                />
              </div>
            </div>

            <div>
              <input
                name="weight"
                type="text"
                placeholder="Product Weight"
                onChange={handleChagne}
              />
            </div>
            <div>
              <input type="file" onChange={fileUpload} />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      ) : !prod.status ? (
        <div>
          <h1>...Waiting</h1>
        </div>
      ) : (
        <div>
          <h1>...Accepted</h1>
        </div>
      )}
    </>
  );
};
