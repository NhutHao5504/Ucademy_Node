const express = require('express');
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const connectDB = require('./config/database');

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

// Cấu hình để nhận dữ liệu từ req.body (JSON và URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

//khai bao route
app.use('/', webRouter);
app.use('/api', apiRouter);


app.listen(PORT, hostname, () => {
  console.log(`Server is running on ${PORT}`);
});