const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongodb connection string
    const mongodbConnection = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Mongodb connected:${mongodbConnection.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
