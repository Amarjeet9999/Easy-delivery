import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  registerLoading,
  registerSuccess,
  registerError,
} from "../../Redux/Auth/action";

export const DriverSignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);

  const { user, token, auth } = useSelector((state) => state.auth);
  console.log("Auth", auth);
  console.log("Token", token);
  console.log("User", user);

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
      dispatch(registerLoading());
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <label>Driving Licence</label>
          <input onChange={fileUpload} type="file" />
        </div>
        <div>
          <input
            name="aadhar"
            onChange={handleChange}
            type="text"
            placeholder="Aadhar no.."
          />
        </div>
        <div>
          <input
            name="phone"
            onChange={handleChange}
            type="text"
            placeholder="Phone no.."
          />
        </div>
        <div>
          <input
            name="vehicle"
            onChange={handleChange}
            type="text"
            placeholder="Vehicle no"
          />
        </div>
        <div>
          <input
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
    </>
  );
};
