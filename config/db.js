const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoConnectionString');

const connectDatabase = async () => {
  try {
    await mongoose.connect(db);

    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
