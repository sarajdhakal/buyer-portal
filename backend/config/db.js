const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

//mongo db connect
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("External MongoDB not available, starting in-memory server...");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB in-memory server running: ${conn.connection.host}`);
  }
};

module.exports = connectDB;
