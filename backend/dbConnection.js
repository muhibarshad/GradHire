const mongoose = require('mongoose');
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');

// Load environment variables
dotenv.config({ path: './config.env' });

// MongoDB connection string
// const DB = 'mongodb://localhost:27017/GradHire';
// const DB = 'mongodb+srv://muhibarshad:bsef21m540@cluster0.dnpkxki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB = 'mongodb+srv://muhibarshad:bsef21m540@cluster0.dnpkxki.mongodb.net/recruuit?retryWrites=true&w=majority&appName=Cluster0';

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

//https://chatgpt.com/share/67befd52-a988-8013-94da-8ddf611a5916
//sudo nano /etc/resolv.conf
//nameserver 8.8.8.8