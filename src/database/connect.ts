import mongoose from "mongoose";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jp3rynn.mongodb.net/?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("Erro ao se conectar ao banco de dados", error);
  } finally {
    const db = await mongoose.connection;
    db.close();
  }
};

export default connectToDb;
