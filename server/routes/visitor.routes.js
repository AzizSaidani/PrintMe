const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/createReclamation', contactController.createReclamation);
router.get('/loadReclamation', contactController.getAllReclamations);
module.exports = router;
