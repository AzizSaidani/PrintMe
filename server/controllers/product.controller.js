const Product = require('../models/product.model');
const Reclamation = require("../models/reclamation.model");

exports.addProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const {name, price, imagePath, category, description,} = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      imagePath,
      category,
      description
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
