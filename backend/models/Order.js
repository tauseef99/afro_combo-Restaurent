const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  cartItems: [
    {
      title: String,
      price: Number,
      quantity: Number,
      img: String
    }
  ],
  total: { type: String },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
