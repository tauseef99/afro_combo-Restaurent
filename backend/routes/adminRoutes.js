const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Admin = require("../models/admin");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

router.get("/menu-items", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

// Add Menu Item (POST)

router.post("/add-menu-item", async (req, res) => {

  try {
    const { title, description, price, img, category } = req.body;

    if (!title || !description || !price || !img || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({ title, description, price, img, category });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

// Update Menu Item (PUT)

router.put("/update-menu-item/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Menu item updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
});


// Delete Menu Item  routes for the post (DELETE)

router.delete("/delete-menu-item/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});


// Admin Registration (Run Once, Then Remove This Route)



router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign({ id: admin._id }, "SECRET_KEY", { expiresIn: "1h" });
    // res.json({ token });
    res.status(200).json({ success: true, message: "Login successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Dashboard (Protected Route)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

module.exports = router;
