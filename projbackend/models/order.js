const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema(
  {
    // Based on product
    product: {
      type: ObjectId,
      reff: "Product",
    },
    name: String,
    count: Number,
    price: Number,
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      reff: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = { Order, ProductCart };
