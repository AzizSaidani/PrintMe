const Reclamation = require('../models/reclamation.model');

exports.createReclamation = async (req, res) => {
  try {
    const { name, email, phone, description , status} = req.body;
    const reclamation = new Reclamation({ name, email, phone, description , status});
    await reclamation.save();
    res.status(201).json({ message: 'Reclamation created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



