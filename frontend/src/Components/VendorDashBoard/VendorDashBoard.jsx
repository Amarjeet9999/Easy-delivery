import axios from "axios";
import React, { useState, useEffect } from "react";
import { storage } from "../Registration/firebase";
import { Wrap } from "./VendorStyle";
export const VendorDashBoard = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [wait, setWait] = useState(false);

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
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleWait = () => {
    setWait(!wait);
  };

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
      ) : (
        <div>
          <h1>Hello</h1>
        </div>
      )}
    </>
  );
};
