import React, { useState, useEffect } from "react";
import { storage } from "../Registration/firebase";
export const VendorDashBoard = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});

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
    console.log(finalData);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
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
              type="number"
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
    </>
  );
};
