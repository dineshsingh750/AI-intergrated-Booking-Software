const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  let retries = 5;

  while (retries) {
    try {
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`🟢 MongoDB connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      console.error(`🔴 Failed to connect MongoDB: ${error.message}`);
      retries--;
      console.log(`⏳ Retrying in 5 seconds... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  if (!retries) {
    console.error('💥 Could not connect to MongoDB. Exiting...');
    process.exit(1);
  }
};

module.exports = connectDB;
