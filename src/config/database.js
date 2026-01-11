const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucademy_db';

        await mongoose.connect(dbUri);
        
        console.log('>>> Connected to MongoDB successfully');
    } catch (error) {
        console.error('>>> Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;