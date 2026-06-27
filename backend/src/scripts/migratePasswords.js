import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserSystem from '../models/UserSystem.js';
import dotenv from 'dotenv';

dotenv.config();

async function migratePasswords() {
  try {
    // Conecte diretamente usando o Mongoose
    console.log("Conectando ao banco...");
    await mongoose.connect(process.env.MONGO_CS, {
      dbName: process.env.MONGO_DB_NAME
    });
    console.log("Conectado com sucesso!");

    const users = await UserSystem.find({});

    for (const user of users) {
      // Verifica se a senha já está hashada (bcrypt começa com $2b$)
      if (user.user_system_password && !user.user_system_password.startsWith('$2b$')) {
        console.log(`Migrando senha do usuário: ${user.user_system_name}`);
        
        const hashedPassword = await bcrypt.hash(user.user_system_password, 10);
        user.user_system_password = hashedPassword;
        
        await user.save();
        console.log(`Senha atualizada para: ${user.user_system_name}`);
      }
    }
    
    console.log("Migração concluída!");
    process.exit(0);
  } catch (error) {
    console.error("Erro fatal na migração:", error);
    process.exit(1);
  }
}

migratePasswords();