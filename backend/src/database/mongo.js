import mongoose from 'mongoose';

export const Mongo = {
  async connect({ mongoConnectionString, mongoDbName }) {
    try {
      // O Mongoose gerencia a conexão globalmente
      await mongoose.connect(mongoConnectionString, {
        dbName: mongoDbName
      });
      return "Connected to mongo!";
    } catch (error) {
      console.error("Erro durante a conexão com o banco de dados!", error);
      throw error;
    }
  }
};