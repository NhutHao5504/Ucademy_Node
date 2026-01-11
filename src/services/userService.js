const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    try {
        return await User.find().select('-password');
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        return await User.findById(id).select('-password');
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, data) => {
    try {
        // Nếu có cập nhật password thì phải hash lại
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const result = await User.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};