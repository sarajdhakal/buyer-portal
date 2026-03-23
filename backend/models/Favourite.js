const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: String,
      required: [true, "Property ID is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

favouriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
