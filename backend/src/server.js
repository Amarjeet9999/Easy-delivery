require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

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

app.use("/user-login", userLogin);
app.use("/user-register", userRegister);
app.use("/driver-login", driverLogin);
app.use("/driver-register", driverRegister);
app.use("/users", userController);

const PORT = process.env.PORT;
module.exports = start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};
