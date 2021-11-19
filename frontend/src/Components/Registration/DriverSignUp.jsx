import React, { useState, useEffect } from "react";
import { storage } from "./firebase";

export const DriverSignUp = () => {
  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  console.log(image);

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
    console.log(finalPayload);
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
            name="adhar"
            onChange={handleChange}
            type="text"
            placeholder="Adhar no.."
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
