import mongoose from 'mongoose';

const userSystemSchema = new mongoose.Schema({
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
}, { 
  timestamps: true 
});

// O terceiro parâmetro 'users_system' trava o nome da collection para não haver divergência
export default mongoose.model('UserSystem', userSystemSchema, 'users_system');