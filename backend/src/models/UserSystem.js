import mongoose from 'mongoose';

const userSystemSchema = new mongoose.Schema(
  {
    user_system_mat: { 
      type: String, 
      required: true, 
      unique: true, 
      minlength: 6, 
      maxlength: 6 
    },
    user_system_name: { 
      type: String, 
      required: true, 
      minlength: 6, 
      maxlength: 20 
    },
    user_system_password: { 
      type: String, 
      required: true, 
      minlength: 8 
    }
  }, 
  { 
    timestamps: true,
    strict: false // Permitindo flexibilidade caso o front precise injetar algo extra
  }
);

// Terceiro argumento 'users_system' trava a coleção para evitar pluralização automática indesejada
export default mongoose.model('UserSystem', userSystemSchema, 'users_system');