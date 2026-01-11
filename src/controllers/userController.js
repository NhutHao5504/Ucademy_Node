const userService = require('../services/userService');
const mongoose = require('mongoose');

const handleGetAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ errCode: 0, data: users });
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server' });
    }
};

const handleGetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ errCode: 1, message: 'ID không hợp lệ' });
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ errCode: 1, message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json({ errCode: 0, data: user });
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server' });
    }
};

const handleUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ errCode: 1, message: 'ID không hợp lệ' });
        }

        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ errCode: 1, message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json({ errCode: 0, message: 'Cập nhật thành công', data: updatedUser });
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server' });
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ errCode: 1, message: 'ID không hợp lệ' });
        }

        const result = await userService.deleteUser(id);
        if (!result) {
            return res.status(404).json({ errCode: 1, message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json({ errCode: 0, message: 'Xóa người dùng thành công' });
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server' });
    }
};

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
};