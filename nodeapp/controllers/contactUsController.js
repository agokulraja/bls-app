const ContactUs = require('../models/ContactUs');


const createContact = async (req, res) => {
    try {
        const  formData  = req.body;
        await ContactUs.create({
        name : formData.name,
        email : formData.email,
        phone : formData.phone,
        message : formData.message
      })
  
      res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error submitting contact form:', error)
      res.status(500).json({ message: 'Error creating ContactUs', error });
    }
  }

module.exports = {createContact}