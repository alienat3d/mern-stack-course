const mongoose = require("mongoose");

// 3.4.0 We'll start out with importing "Mongoose" here and then define an async function "connectDB". Inside that function in a try-catch construction we'll be trying to connect to the database with "mongoose.connect" method, where we pass in the environment variable that consist the database connection string.
// (Go to [server.js])
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;