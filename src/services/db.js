import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connectionRes = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to db ${connectionRes.connection.host}`);
  } catch (error) {
    console.log(`DB connection Error ${error.message}`);
    process.exit(1);
  }
};
