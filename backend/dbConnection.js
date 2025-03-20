const mongoose = require('mongoose');
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');

// Load environment variables from .env file
dotenv.config();

// Get the database URL from environment variables
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Function to connect to the database
const connectDB = catchAsync(async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Recommended for newer MongoDB versions
    });
    console.log('DB connection successful!');
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1); // Exit process if the connection fails
  }
});

module.exports = connectDB;


//For Server error
//https://chatgpt.com/share/67befd52-a988-8013-94da-8ddf611a5916
//sudo nano /etc/resolv.conf
//nameserver 8.8.8.8