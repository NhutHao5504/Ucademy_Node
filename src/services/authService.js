const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('./jwtService');

const registerUser = async (email, password, name) => {
    try {
        // 0. Validate input
        if (!email || !password || !name) {
            return {
                errCode: 1,
                message: 'Vui lòng nhập đầy đủ thông tin'
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { errCode: 1, message: 'Email không đúng định dạng' };
        }

        if (password.length < 6) {
            return { errCode: 1, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
        }

        // 1. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                errCode: 1,
                message: 'Email đã tồn tại'
            };
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name
        });

        return {
            errCode: 0,
            message: 'Đăng ký thành công',
            data: { id: newUser._id, email: newUser.email, name: newUser.name }
        };
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        if (!email || !password) {
            return {
                errCode: 1,
                message: 'Vui lòng nhập email và mật khẩu'
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { errCode: 1, message: 'Email không đúng định dạng' };
        }

        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { id: user._id, email: user.email, role: user.role };
            const token = createToken(payload);

            return {
                errCode: 0,
                message: 'Đăng nhập thành công',
                access_token: token,
                user: { id: user._id, email: user.email, name: user.name, role: user.role }
            };
        }

        return {
            errCode: 1,
            message: 'Email hoặc mật khẩu không chính xác'
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser
};