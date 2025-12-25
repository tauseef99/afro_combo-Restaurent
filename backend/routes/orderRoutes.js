// routes/orderRoutes.js or wherever you define API routes
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Mongoose model

router.post("/api/order", async (req, res) => {
  try {
    const { name, address, phone, email, cartItems, total, orderDate } = req.body;

    const newOrder = new Order({
      name,
      address,
      phone,
      email,
      cartItems,
      total,
      orderDate,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

module.exports = router;
