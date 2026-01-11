const authService = require('../services/authService');

const handleRegister = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ errCode: 1, message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const result = await authService.registerUser(email, password, name);
        return res.status(result.errCode === 0 ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server', error: error.message });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errCode: 1, message: 'Vui lòng nhập email và mật khẩu' });
        }

        const result = await authService.loginUser(email, password);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: 'Lỗi server', error: error.message });
    }
};

module.exports = {
    handleRegister,
    handleLogin
};
