import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema(
  {
    // Campo opcional para garantir a ordenação das páginas ou abas no sistema
    order: { type: Number, default: 0 },

    // Multi-tenancy (isolamento por tenant)
    tenantId: { type: String, default: "default", index: true }
  },
  { 
    strict: false, // Permite salvar qualquer propriedade de configuração dinâmica da página
    timestamps: true 
  }
);

// O terceiro argumento 'pages' força o nome exato da coleção no MongoDB
export default mongoose.model('Page', pageSchema, 'pages');