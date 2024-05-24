const Product = require('../models/product.model');
const PDFDocument = require('pdfkit');
const stripe = require('stripe')('sk_test_51Lyzt5GUzUAnKjP7lyDDM7pIo796ADLQ1tSA4GPYbNy72UxRVrgJiAlR7lpxDY4QgAOytVpOz3bIqogfwAOIzsQE00oqXQuusb');



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
exports.payment = async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Custom Payment',
          },
          unit_amount: amount * 100, // Stripe expects the amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/shop`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Custom Payment',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/bill`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.generateBill = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products provided' });
    }

    const fetchedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findOne({ name: item.product.name });
        if (!product) {
          throw new Error(`Product ${item.product.name} not found`);
        }
        return {
          ...product._doc,
          amount: item.amount,
        };
      })
    );

    const pdfDoc = new PDFDocument();
    const filename = `facture.pdf`;

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'application/pdf');

    pdfDoc.pipe(res);

    // Set PDF metadata
    pdfDoc.info.Title = 'Facture';
    pdfDoc.info.Author = 'Your Company Name';

    // Add company name to the PDF content
    pdfDoc.fontSize(20).text('Your Company Name', { align: 'center' });
    pdfDoc.moveDown(); // Move down to create space after the company name

    // Design the bill using PDFKit methods
    pdfDoc.fontSize(25).text('Facture', { align: 'center' });

    // Table headers
    const columnPositions = {
      name: 50,
      price: 200,
      category: 300,
      amount: 450,
    };
    const columnWidths = {
      name: 140,
      price: 100,
      category: 140,
      amount: 100,
    };

    const lineHeight = 20; // Adjust this value to control the vertical spacing
    let currentY = pdfDoc.y + 50; // Start the table below the title

    pdfDoc.fontSize(12);
    pdfDoc.text('Product Name', columnPositions.name, currentY, { width: columnWidths.name });
    pdfDoc.text('Price', columnPositions.price, currentY, { width: columnWidths.price });
    pdfDoc.text('Category', columnPositions.category, currentY, { width: columnWidths.category });
    pdfDoc.text('Amount', columnPositions.amount, currentY, { width: columnWidths.amount });

    currentY += lineHeight; // Move down for the next row

    let total = 0;

    // Table rows
    fetchedProducts.forEach((product) => {
      const productNameHeight = pdfDoc.heightOfString(product.name, { width: columnWidths.name });
      const productCategoryHeight = pdfDoc.heightOfString(product.category, { width: columnWidths.category });
      const rowHeight = Math.max(productNameHeight, productCategoryHeight, lineHeight);

      pdfDoc.text(product.name, columnPositions.name, currentY, { width: columnWidths.name });
      pdfDoc.text(`$${product.price}`, columnPositions.price, currentY, { width: columnWidths.price });
      pdfDoc.text(product.category, columnPositions.category, currentY, { width: columnWidths.category });
      pdfDoc.text(product.amount.toString(), columnPositions.amount, currentY, { width: columnWidths.amount });

      total += product.price * product.amount;
      currentY += rowHeight; // Move down for the next row
    });

    // Total
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text(`Total: $${total.toFixed(2)}`, { align: 'right' });

    pdfDoc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

