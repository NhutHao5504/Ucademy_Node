const { verifyToken } = require('../services/jwtService');

const checkUserJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Bạn chưa đăng nhập (Thiếu Token)'
        });
    }
};

module.exports = {
    checkUserJWT
};
