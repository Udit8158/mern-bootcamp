const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //ObjectId
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    category: {
      type: ObjectId, //TODO: confusion in ObjectId
      ref: "Category", // Means linking Category model
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentTypes: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
