const Commande = require('../models/Commande.model');
const Cart = require('../models/cart.model');
const mongoose = require('mongoose');


exports.createCommande = async (req, res) => {
  const {userId, method} = req.body;

  if (!userId || !method) {
    return res.status(400).json({error: 'userId and method are required'});
  }

  try {
    // Find the cart for the given userId
    const cart = await Cart.findOne({userId: mongoose.Types.ObjectId(userId)}).exec();
    if (!cart) {
      return res.status(404).json({error: 'Cart not found'});
    }

    // Create a new Commande with items from the cart
    const newCommande = new Commande({
      userId: mongoose.Types.ObjectId(userId),
      status: 'en cours',
      payment: method,
      items: cart.items,
      cartId: cart._id
    });

    // Save the new Commande to the database
    const savedCommande = await newCommande.save();

    return res.status(201).json(savedCommande);
  } catch (error) {
    console.error('Error creating commande:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};

