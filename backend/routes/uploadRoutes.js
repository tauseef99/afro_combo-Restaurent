const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const MenuItem = require("../models/MenuItem");


const router = express.Router();


// Middleware to parse JSON
router.use(express.json());

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"), // Fix uploads path
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Image Upload API
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Serve static images
router.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Fix static path

// API to fetch uploaded images
router.get("/get-images", (req, res) => {
  const uploadsDir = path.join(__dirname, "../uploads"); // Fix uploads directory path

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ error: "Failed to fetch images" });
    }

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No images found in uploads directory" });
    }

    const imageUrls = files.map(file => ({
      filename: file,
      url: `http://localhost:5000/uploads/${file}`
    }));

    res.json(imageUrls);
  });
});


// Update a menu item
router.put("/menu-item/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

// Delete a menu item
router.delete("/menu-item/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});



module.exports = router;



// const express = require("express");
// const MenuItem = require("../models/MenuItem"); // Import the MenuItem model

// const router = express.Router();

// // Add a new menu item
// router.post("/add-menu-item", async (req, res) => {
//   try {
//     const newItem = new MenuItem(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add menu item" });
//   }
// });

// // Fetch all menu items
// router.get("/menu-items", async (req, res) => {
//   try {
//     const items = await MenuItem.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch menu items" });
//   }
// });

// // Update a menu item
// router.put("/menu-item/:id", async (req, res) => {
//   try {
//     const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update menu item" });
//   }
// });

// // Delete a menu item
// router.delete("/menu-item/:id", async (req, res) => {
//   try {
//     const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
//     if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });
//     res.json({ message: "Menu item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete menu item" });
//   }
// });

// module.exports = router;
