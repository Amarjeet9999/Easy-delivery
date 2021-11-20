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
  const [mainData, setMainData] = useState([]);
  const packageDetail = JSON.parse(localStorage.getItem("package"));

  console.log(mainData);

  console.log(id);
  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  useEffect(() => {
    handleDetails();
  }, []);

  useEffect(() => {
    loadData();
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
      console.log(res);
      setProd(res.data.data[0]);
    });
  };

  const handleDetails = async () => {
    await axios.get("http://localhost:5000/package").then((e) => {
      console.log(e.data.data);
    });
  };

  const loadData = async () => {
    await axios
      .get(`http://localhost:5000/package/${packageDetail._id}`)
      .then((e) => {
        setMainData(e.data.data);
        console.log("item", e.data);
      });
  };

  const handleWait = () => {
    setWait(true);
  };

  const handledet = () => {
    setWait(false);
  };

  // Important Function Be Aware
  React.useEffect(() => {
    waitingData();
    const pusher = new Pusher("ab5a3318322a6c2ce338", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("package");

    channel.bind("updated", (el) => {
      let packageId = JSON.parse(localStorage.getItem("package"));
      console.log("Before", packageId.status);
      console.log("El", el);
      if (el.id === packageId._id) {
        let data = { ...prod, status: el.status };
        setProd(data);
        console.log("Matched");
        console.log("After", packageId.status);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  console.log("Prod", prod);

  return (
    <>
      <div className={styles.headingContainer}>
        <div onClick={handledet}>Product Detail</div>
        <div onClick={handleWait}>
          {prod.status ? "Accepted" : "Waiting Area"}
        </div>
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
      ) : packageDetail === null ? (
        <div>
          <h1>..You Have No any products</h1>
        </div>
      ) : !prod.status ? (
        <div className={styles.sub_container}>
          <div className={styles.list}>
            <h4 style={{ color: "red" }}>Finding Perfect Match...</h4>
            <div className={styles.route}>
              <div className={styles.text}>
                <span>From : </span>
                <span>{mainData[0]?.from}</span>
              </div>
              <div className={styles.text}>
                <span>Destination : </span>
                <span>{mainData[0]?.to}</span>
              </div>
            </div>
            <div className={styles.text}>
              <span>Item : </span>
              <span>{mainData[0]?.packageName}</span>
            </div>
            <div className={styles.text}>
              <span>Weight : </span>
              <span>{mainData[0]?.weight}</span>
            </div>
            <div className={styles.image}>
              <img src={mainData[0]?.image} alt="" />
            </div>
            <div className={styles.image}>
              <img
                style={{ objectFit: "cover", height: "25px" }}
                src="https://i.pinimg.com/originals/4c/14/02/4c14021095fd20edc900e2e9b91d318e.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.sub_container2}>
          <div className={styles.list2}>
            {
              <h4>
                You product is Accepted by {mainData[0]?.driverId[0]?.name}
              </h4>
            }
            <div
              style={{
                display: "flex",
                justifyContent: "inherit",
                margin: "50px 20px",
              }}
            >
              <div className={styles.listData}>
                <div className={styles.route}>
                  <div className={styles.text}>
                    <span>From : </span>
                    <span>{mainData[0]?.from}</span>
                  </div>
                  <div className={styles.text}>
                    <span>Destination : </span>
                    <span>{mainData[0]?.to}</span>
                  </div>
                </div>
                <div className={styles.text}>
                  <span>Item : </span>
                  <span>{mainData[0]?.packageName}</span>
                </div>
                <div className={styles.text}>
                  <span>Weight : </span>
                  <span>{mainData[0]?.weight}</span>
                </div>
                <div className={styles.image}>
                  <img src={mainData[0]?.image} alt="" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridGap: "10px",
                  marginTop: "6px",
                  margin: "0 10px",
                }}
              >
                <div>
                  <span>Name : </span>
                  {mainData[0]?.driverId[0]?.name}
                </div>
                <div>
                  <span>Phone No : </span>
                  {mainData[0]?.driverId[0]?.phone}
                </div>
                <div>
                  <span>Vehicle No : </span>
                  {mainData[0]?.driverId[0]?.vehicleNo}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
