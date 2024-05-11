const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/createReclamation', contactController.createReclamation);
module.exports = router;
