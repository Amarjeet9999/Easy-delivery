const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const driverSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    aadhar: { type: String, required: true },
    license: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Storing hashed password in DB
driverSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

driverSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("driver", driverSchema);
