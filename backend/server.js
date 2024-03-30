// require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(3000)

const connectDB = require('./config/db');
connectDB();

const blogRouter = require('./routes/blogController');
const userRouter = require('./routes/userController');

app.use('/blog', blogRouter);
app.use('/user', userRouter);
