import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONECTOU AO BANCO DE DADOS");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
