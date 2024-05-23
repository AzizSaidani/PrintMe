const Contact = require('../models/contact.model');
const Reclamation = require('../models/reclamation.model');

exports.createContact = async (req, res) => {
  try {
    const {name, email, phone, description, status} = req.body;
    const contact = new Contact({name, email, phone, description, status});
    await contact.save();
    res.status(201).json({message: 'Contact created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.createReclamation = async (req, res) => {
  try {
    const {name, email, phone, description, method, status} = req.body;
    const reclamation = new Reclamation({name, email, phone, description, method, status});
    await reclamation.save();
    res.status(201).json({message: 'Reclamation created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getAllReclamation = async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



