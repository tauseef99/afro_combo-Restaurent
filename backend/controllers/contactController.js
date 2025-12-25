const Contact = require('../models/Contact');

// Controller to handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save contact form data to the database
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { submitContactForm };
