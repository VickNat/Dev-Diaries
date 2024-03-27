const dotenv = require("dotenv")
const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

dotenv.config()

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    // console.log("connectionString", connectionString);

    const con = await mongoose.connect(connectionString);
    console.log(`Database connected : ${con.connection.host}`);

    //Initialise blogschema
    await Blog.init();
    //Initialise userschema
    await User.init();

    console.log("Blog schema initialised");
    console.log("User schema initialised");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;