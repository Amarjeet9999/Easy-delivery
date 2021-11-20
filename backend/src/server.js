require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: "1300812",
  key: "1a697b90bc54cbe04c2c",
  secret: "5be03c3dcd6ea6e56959",
  cluster: "ap2",
  encrypted: true,
});

// Controllers
const userController = require("./controllers/users.controller");
const cityController = require("./controllers/cities.controller");
const {
  userRegister,
  userLogin,
} = require("./controllers/userAuth.controller");
const {
  driverRegister,
  driverLogin,
} = require("./controllers/driverAuth.controllers");
const packageController = require("./controllers/package.controller");
const driverController = require("./controllers/drive.control.js");

const connectDB = async () => {
  await connect();
};
connectDB();

app.use("/user-login", userLogin);
app.use("/user-register", userRegister);
app.use("/driver-login", driverLogin);
app.use("/driver-register", driverRegister);
app.use("/users", userController);
app.use("/package", packageController);
app.use("/driver", driverController);
app.use("/city", cityController);

///
///
///
const PORT = process.env.PORT;

const db = mongoose.connection;
const channel = "package";
db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open", () => {
  const taskCollection = db.collection("packages");
  const changeStream = taskCollection.watch();

  changeStream.on("change", (change) => {
    console.log("Some Change Happened");

    if (change.operationType === "insert") {
      const package = change.fullDocument;
      console.log("Package", package);
      pusher.trigger("package", "inserted", {
        id: package._id,
        from: package.from,
        to: package.to,
        packageName: package.packageName,
        image: package.image,
        weight: package.weight,
        status: package.status,
      });
    } else if (change.operationType === "delete") {
      pusher.trigger(channel, "deleted", change.documentKey._id);
    } else if (change.operationType === "update") {
      const package = change.documentKey._id;
      const package2 = change.updateDescription;
      pusher.trigger("package", "updated", {
        status: package2.updatedFields.status,
        id: package,
      });
    }
  });
});

module.exports = start = async () => {
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};
