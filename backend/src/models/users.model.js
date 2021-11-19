const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    aadhar: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Storing hashed password in DB
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
