const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controllers');

router.post('/createReclamation', contactController.createReclamation);
module.exports = router;
