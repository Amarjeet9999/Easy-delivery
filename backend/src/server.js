require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const app = express();
const Pusher = require("pusher");
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: "1300600",
  key: "07f9665426309685e7ad",
  secret: "80594936bec4b283e6d6",
  cluster: "ap2",
  encrypted: true,
});

// Controllers
const userController = require("./controllers/users.controller");
const {
  userRegister,
  userLogin,
} = require("./controllers/userAuth.controller");
const {
  driverRegister,
  driverLogin,
} = require("./controllers/driverAuth.controllers");
const packageController = require("./controllers/package.controller");

app.use("/user-login", userLogin);
app.use("/user-register", userRegister);
app.use("/driver-login", driverLogin);
app.use("/driver-register", driverRegister);
app.use("/users", userController);
app.use("/package", packageController);

const PORT = process.env.PORT;
module.exports = start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};
