const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng ký người dùng
router.post('/register', userController.register);

// Đăng nhập người dùng
router.post('/login', userController.login);

module.exports = router;
