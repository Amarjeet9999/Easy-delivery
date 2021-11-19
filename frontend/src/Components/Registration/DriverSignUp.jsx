import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import axios from "axios";
import styles from "./DriverSignUp.module.css";
import { TextField, Typography } from "@mui/material";
import { ReactComponent as DriverSignUpSvg } from "../Home/svg/driverSignUp.svg";

export const DriverSignUp = () => {
  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const fileUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalPayload = { ...formData, url: url };
    // console.log(finalPayload);
    handleRegister(finalPayload);
  };

  const handleRegister = async (el) => {
    try {
      console.log("EL", el);
      await axios
        .post("http://localhost:5000/driver-register", {
          email: el.email,
          name: el.name,
          aadhar: el.aadhar,
          dlicense: el.url,
          phone: el.phone,
          vehicleNo: el.vehicle,
          password: el.password,
          roles: "driver",
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.signUpFormContainer}>
      <Typography variant="caption" className={styles.drivingLicense}>
        Driving License Identification<span style={{ color: "red" }}>*</span>
      </Typography>
      <div className={styles.signUpSvg}>
        <DriverSignUpSvg />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <TextField
            id="outlined-name"
            label="Name"
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="E-mail Address"
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <TextField onChange={fileUpload} type="file" />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Phone Number"
            name="phone"
            onChange={handleChange}
            type="text"
            placeholder="Phone no.."
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Aadhar Number"
            name="aadhar"
            onChange={handleChange}
            type="text"
            placeholder="Aadhar no.."
          />
        </div>

        <div>
          <TextField
            id="outlined-name"
            label="Vehicle Number"
            name="vehicle"
            onChange={handleChange}
            type="text"
            placeholder="Vehicle no"
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <input onChange={handleChange} type="submit" />
        </div>
      </form>
    </div>
  );
};
