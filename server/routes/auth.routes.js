const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/loadUsers', authController.getAllUsers);
router.post('/reset', authController.resetPassword);
router.get('/reset/:token', authController.renderResetPasswordForm);
router.post('/reset/:token', authController.updatePassword);
router.post('/change-password', authController.changePassword);
router.post('/updateUsername', authController.updateUsername);
router.post('/updateAddress', authController.updateAddress);
router.post('/updatePhoneNumber', authController.updatePhoneNumber);
router.get('/users/:id', authController.getUserDetails);

module.exports = router;
