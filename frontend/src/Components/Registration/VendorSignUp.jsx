import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registerLoading,
  registerSuccess,
  registerError,
} from "../../Redux/Auth/action";

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
    try {
      dispatch(registerLoading());
      await axios
        .post("http://localhost:5000/user-register", {
          email: el.email,
          name: el.name,
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Name"
            name="name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Phone No"
            name="phone"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Aadhar"
            name="aadhar"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="file" onChange={handleUpload} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};
