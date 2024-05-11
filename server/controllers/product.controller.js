const Product = require('../models/product.model');

exports.addProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const { name, price, imagePath, description } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      imagePath,
      description
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the saved product
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: error.message });
  }
};

