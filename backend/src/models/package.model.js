const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    packageName: { type: String, required: true },
    image: { type: String, required: true },
    weight: { type: String, required: true },
    status: { type: Boolean, required: true },
    driverId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("package", packageSchema);
