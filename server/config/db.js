const mongoose = require('mongoose');
const config = require('./default.json');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;