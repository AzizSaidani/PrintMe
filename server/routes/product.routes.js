const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
router.post('/products', productController.addProduct);
module.exports = router;
