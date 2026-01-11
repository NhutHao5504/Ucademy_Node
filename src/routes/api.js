const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Auth routes
router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);

// User CRUD routes (RESTful)
router.get('/users', userController.handleGetAllUsers);          // Lấy danh sách
router.get('/users/:id', userController.handleGetUserById);      // Lấy chi tiết
router.put('/users/:id', userController.handleUpdateUser);       // Cập nhật
router.delete('/users/:id', userController.handleDeleteUser);    // Xóa

module.exports = router;