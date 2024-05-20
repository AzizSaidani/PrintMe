const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const commentController = require('../controllers/comment.controller');
const cartController = require('../controllers/cart.controller');
router.post('/add', productController.addProduct);
router.get('/load', productController.getAllProducts);
router.post('/comment', commentController.addComment);
router.get('/loadComments', commentController.getAllComments);
router.get('/generateBill/:name', productController.generateBill);
router.post('/cart', cartController.addToCart);
router.get('/cart/:userId', cartController.getCartItems);

module.exports = router;
