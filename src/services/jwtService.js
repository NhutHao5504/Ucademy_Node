const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (payload) => {
    const key = process.env.JWT_SECRET || 'secret_key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    try {
        return jwt.sign(payload, key, { expiresIn });
    } catch (err) {
        console.log('JWT Create Error:', err);
        return null;
    }
};

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET || 'secret_key';
    try {
        return jwt.verify(token, key);
    } catch (err) {
        return null;
    }
};

module.exports = { createToken, verifyToken };