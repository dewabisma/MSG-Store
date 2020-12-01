import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connection: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error Message: ${error.messages}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
