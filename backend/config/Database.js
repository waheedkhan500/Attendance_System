import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONOGDB_URI);
    console.log(`Mongo Db connected with host : ${conn.connection.host}`);
  } catch (error) {
    console.log("ERROR : Faild to connect Database : ", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
