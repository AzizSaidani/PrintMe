const Reclamation = require('../models/reclamation.model');

exports.createReclamation = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const reclamation = new Reclamation({ name, email, phone, description });
    await reclamation.save();
    res.status(201).json({ message: 'Reclamation created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
