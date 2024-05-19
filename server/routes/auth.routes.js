const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/loadUsers', authController.getAllUsers);
router.post('/reset', authController.resetPassword);
router.get('/reset/:token', authController.renderResetPasswordForm);
router.post('/reset/:token', authController.updatePassword);

module.exports = router;
