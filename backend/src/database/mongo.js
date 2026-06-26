import mongoose from 'mongoose';

export const Mongo = {
  async connect({ mongoConnectionString, mongoDbName }) {
    try {
      console.log("Conectando ao banco com Mongoose...");
      
      // O Mongoose gerencia a conexão globalmente
      await mongoose.connect(mongoConnectionString, {
        dbName: mongoDbName
      });
      
      console.log("Conectado ao MongoDB!");
      return "Connected to mongo!";
    } catch (error) {
      console.error("Erro durante a conexão com o banco de dados!", error);
      throw error;
    }
  }
};