import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
export const VendorSignUp = () => {
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

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
    console.log(load);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="email" type="email" onChange={handleChange} />
        </div>
        <div>
          <input name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <input name="phone" type="text" onChange={handleChange} />
        </div>
        <div>
          <input name="adhar" type="text" onChange={handleChange} />
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
