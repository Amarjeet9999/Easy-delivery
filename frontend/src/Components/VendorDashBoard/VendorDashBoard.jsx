import axios from "axios";
import React, { useState, useEffect } from "react";
import { storage } from "../Registration/firebase";
import Pusher from "pusher-js";
import styles from "./VendorDashBoard.module.css";
import { TextField, Typography } from "@mui/material";
import { ReactComponent as ProductDetailsSvg } from "../Home/svg/productDetails.svg";

export const VendorDashBoard = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [wait, setWait] = useState(false);
  const [id, setId] = useState("");
  const [prod, setProd] = useState("");

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
    try {
      await axios
        .post("http://localhost:5000/package", {
          from: el.from,
          to: el.to,
          packageName: el.name,
          image: el.url,
          weight: el.weight,
          status: false,
          driverId: [],
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
    if (id === null || id === undefined) return;
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

  // Important Function Be Aware
  React.useEffect(() => {
    waitingData();
    const pusher = new Pusher("e028bc463a9bc675142e", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("package");

    channel.bind("updated", (el) => {
      let packageId = JSON.parse(localStorage.getItem("package"));
      // console.log("Before", packageId.status);
      // console.log("El", el.status);
      if (el.id === packageId._id) {
        let data = { ...prod, status: el.status };
        setProd(data);
        // console.log("Matched");
        // console.log("After", packageId.status);
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
      <div className={styles.headingContainer}>
        <div onClick={handleWait}>Product Detail</div>
        <div onClick={handleWait}>Waiting Area</div>
      </div>
      {!wait ? (
        <div className={styles.productDetails}>
          <Typography variant="h6" className={styles.info}>
            Enter Product Details <span style={{ color: "red" }}>*</span>
          </Typography>
          <div className={styles.signUpSvg}>
            <ProductDetailsSvg />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <TextField
                id="outlined-name"
                label="Product name"
                name="name"
                type="text"
                placeholder="Product name"
                onChange={handleChagne}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Product weight"
                name="weight"
                type="text"
                placeholder="Product Weight"
                onChange={handleChagne}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="From"
                name="from"
                type="text"
                placeholder="From"
                onChange={handleChagne}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="To"
                name="to"
                type="text"
                placeholder="To"
                onChange={handleChagne}
              />
            </div>

            <div>
              <TextField type="file" onChange={fileUpload} />
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
