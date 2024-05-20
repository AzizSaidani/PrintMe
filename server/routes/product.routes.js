const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const commentController = require('../controllers/comment.controller');
router.post('/add', productController.addProduct);
router.get('/load', productController.getAllProducts);
router.post('/comment', commentController.addComment);
router.get('/loadComments', commentController.getAllComments);
router.get('/generateBill/:name', productController.generateBill);

module.exports = router;
