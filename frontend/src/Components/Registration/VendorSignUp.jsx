import { TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registerLoading,
  registerSuccess,
  registerError,
} from "../../Redux/Auth/action";
import styles from "./VendorSignUp.module.css";
import { ReactComponent as DriverSignUpSvg } from "../Home/svg/vendorSignUp.svg";

export const VendorSignUp = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  // const { user, token, auth, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (image) {
      handlePost();
    }
  }, [image]);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = () => {
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

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let load = { ...formData, url: url };
    handleRegister(load);
  };

  const handleRegister = async (el) => {
    console.log("EL", el);
    try {
      dispatch(registerLoading());
      await axios
        .post("http://localhost:5000/user-register", {
          email: el.email,
          name: "name",
          aadhar: el.aadhar,
          phone: el.phone,
          password: el.password,
          roles: "user",
        })
        .then((res) => {
          const action = registerSuccess(res.data);
          dispatch(action);
          localStorage.setItem("user", JSON.stringify(res.data));
        });
    } catch (err) {
      const action = registerError("wrong credentials");
      dispatch(action);
      console.log(err);
    }
  };

  return (
    <div className={styles.vendorSignUp}>
      <Typography variant="caption" className={styles.drivingLicense}>
        Identification <span style={{ color: "red" }}>*</span>
      </Typography>
      <Typography variant="h6" className={styles.info}>
        Enter Vendor's Information <span style={{ color: "red" }}>*</span>
      </Typography>
      <div className={styles.signUpSvg}>
        <DriverSignUpSvg />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <TextField
            id="outlined-name"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Phone Number"
            name="phone"
            type="text"
            onChange={handleChange}
            placeholder="Phone no..."
          />
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Aadhar Number"
            name="aadhar"
            type="text"
            onChange={handleChange}
            placeholder="Aadhar no..."
          />
        </div>
        <div>
          <TextField type="file" onChange={handleUpload} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};



