import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema(
  {}, // Deixamos o schema vazio
  { 
    strict: false, // Permite que qualquer dado seja salvo no documento
    timestamps: true 
  }
);

export default mongoose.model('Field', fieldSchema, 'fields');