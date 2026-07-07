/*
    Type: Script
    Description: Script de migração única para adicionar tenantId: "default"
    a todos os documentos existentes que ainda não possuem o campo.
    Executar uma vez após o deploy da ETAPA 6.
    Date: 06/07/2026

    Uso: node src/scripts/addTenantId.js
*/

import { Mongo } from "../database/mongo.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "../../.env") });

const COLLECTIONS = ["users", "activities", "fields", "pages", "menus", "users_system"];

async function run() {
  const connection = await Mongo.connect({
    mongoConnectionString: process.env.MONGO_CS,
    mongoDbName: process.env.MONGO_DB_NAME,
  });
  console.log("Conectado ao MongoDB:", connection);

  const db = Mongo.db;

  for (const collectionName of COLLECTIONS) {
    const collection = db.collection(collectionName);
    const result = await collection.updateMany(
      { tenantId: { $exists: false } },
      { $set: { tenantId: "default" } }
    );
    console.log(`✅ ${collectionName}: ${result.modifiedCount} documentos atualizados`);
  }

  console.log("\n🚀 Migração tenantId concluída com sucesso!");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Erro na migração:", err);
  process.exit(1);
});
