
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require("./routes/uploadRoutes");

// const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const adminRoutes = require("./routes/adminRoutes");


const contactRoutes = require('./routes/contactRoutes');
const menuRoutes = require("./routes/menuRoutes");
const MenuItem = require("./models/MenuItem");

const nodemailer = require("nodemailer");
require('dotenv').config();

const fs = require("fs");
const path = require("path");

// const reviewRoutes = require('./routes/reviewRoutes'); 
// const { scrapeGoogleReviews } = require('./controllers/scraper');



const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Middleware
// app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);
app.use("/admin", adminRoutes);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Use upload routes
app.use("/api", uploadRoutes);

// Serve images from the "uploads" folder
const uploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

app.get("/api/get-images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ error: "Failed to read uploads directory" });
    }

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No images found in uploads directory" });
    }

    // Generate image URLs
    const images = files.map((file) => ({
      name: file,
      url: `http://localhost:5000/uploads/${file}`,
    }));

    res.json(images);
  });
});


app.post("/api/add-menu-item", async (req, res) => {
  try {
    const { title, description, price, img, category } = req.body;

    // Validate input
    if (!title || !description || !price || !img || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new menu item
    const newItem = new MenuItem({
      title,
      description,
      price,
      img,
      category
    });

    // Save to database
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", data: newItem });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});


// Route for sending emails
app.post("/api/contact", async (req, res) => {
    const { firstName, lastName, phone, email, message } = req.body;
  
    try {
      // Configure the Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });
  
      // Email to the restaurant owner
     const ownerMailOptions = {
    from: `"Afro Contact" <${process.env.EMAIL_USER}>`, 
    to: process.env.OWNER_EMAIL, 
    subject: "👨‍🍳 Message from Afro Client",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">New Contact Form Submission</h2>
        <p style="font-size: 16px;">You have received a new message from your website contact form:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; background: #f9f9f9; font-weight: bold; width: 20%;">Name:</td>
            <td style="padding: 8px; background: #f9f9f9;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f1f1f1; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; background: #f1f1f1;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f9f9f9; font-weight: bold;">Email:</td>
            <td style="padding: 8px; background: #f9f9f9;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f1f1f1; font-weight: bold;">Message:</td>
            <td style="padding: 8px; background: #f1f1f1;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">
          <em>This email was generated automatically. Please reply directly to the sender if needed.</em>
        </p>
      </div>
    `,
};

  
      // Email to the user as confirmation
      const userMailOptions = {
        from: `"Afro Restaurant Team" <${process.env.EMAIL_USER}>`,
        to: email, 
        subject: "Thank You for Contacting Us!",
        html: `
          <h3>Thank You, ${firstName}!</h3>
          <p>We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>We will get back to you shortly.</p>
          <p>Best regards,</p>
          <p><strong>Your Restaurant Team</strong></p>
        `,
      };
  
      // Send both emails
      await transporter.sendMail(ownerMailOptions);
      await transporter.sendMail(userMailOptions);
  
      res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).json({ error: "Failed to send emails" });
    }
  });
  
// Routes
app.use('/api', contactRoutes);
// app.post('/api/reviews/scrape', scrapeGoogleReviews);


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
  },
});

// Order API - Send Order Email
app.post("/api/order", async (req, res) => {
  const { name, address, phone, email, cartItems } = req.body; // ✅ Added email

  if (!name || !address || !phone || !email || cartItems.length === 0) {
      return res.status(400).json({ error: "All fields are required" });
  }

  let orderItemsHTML = cartItems.map(item => `
      <tr>

          <td style="padding: 8px; border: 1px solid #ddd;">${item.title || item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
      </tr>
  `).join('');

  const emailHtml = `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p> <!-- ✅ Display customer's email -->
      <h3>Order Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
          <tr>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f2f2f2;">Item</th>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f2f2f2;">Quantity</th>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f2f2f2;">Price</th>
          </tr>
          ${orderItemsHTML}
      </table>
      <p><strong>Total Amount:</strong> $${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
  `;

  try {
      // Send order email to owner
      await transporter.sendMail({
          from: `"Afro Restaurant" <${process.env.EMAIL_USER}>`,
          to: process.env.OWNER_EMAIL,
          subject: "📦 New Order Received",
          html: emailHtml,
      });

      // Send confirmation email to customer
      await transporter.sendMail({
          from: `"Afro Restaurant" <${process.env.EMAIL_USER}>`,
          to: email,  
          subject: "Your Order Confirmation",
          html: `
              <h3>Thank You for Your Order, ${name}!</h3>
              <p>Your order has been received and is being processed.</p>
              <p>We will contact you soon at <strong>${phone}</strong>.</p>
              <p>Best Regards, Afro Restaurant Team</p>
          `,
      });

      res.status(200).json({ message: "Order placed and email sent successfully!" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send order email" });
  }
});

app.post("/api/book-table", async (req, res) => {
  const { person, date, time, phone } = req.body;

  if (!person || !date || !time || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailHtml = `  
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">  
      <h2 style="color: #333; text-align: center;">🍽️ Table Booking Order</h2>  
       
      <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);">  
          <p style="font-size: 16px; color: #333;"><strong>👤 Total Person:</strong> ${person}</p>  
          <p style="font-size: 16px; color: #333;"><strong>📅 Date:</strong> ${date}</p>  
          <p style="font-size: 16px; color: #333;"><strong>⏰ Time:</strong> ${time}</p>  
          <p style="font-size: 16px; color: #333;"><strong>📞 Phone:</strong> ${phone}</p>  
      </div>  
      <p style="text-align: center; font-size: 16px; color: #333;"><strong>Message from Afro Team</strong></p>  
  </div>`;  


  try {
    // Send email to restaurant owner
    await transporter.sendMail({
      from: `"Afro Restaurant" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "🛎️ New Table Booking",
      html: emailHtml,
    });

    res.status(200).json({ message: "Table booked successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send booking email" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
