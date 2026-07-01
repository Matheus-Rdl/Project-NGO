import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_mat: { type: String, required: true, unique: true, minlength: 6, maxlength: 6 },
  user_name: { type: String, required: true, uppercase: true, minlength: 3, maxlength: 80 },
  user_mother_name: { type: String, required: true, uppercase: true, maxlength: 80 },
  user_father_name: { type: String, uppercase: true, maxlength: 80 },
  
  // Dados Pessoais
  user_gender: { type: Number, required: true }, 
  user_civil_status: { type: Number, required: true },
  user_date_nasc: { type: String, required: true }, 
  user_age: { type: Number, required: true },
  
  // Documentos
  user_cpf: { type: String, required: true, minlength: 11, maxlength: 11 },
  user_rg: { type: String, maxlength: 10 },
  
  // Endereço
  user_cep: { type: String, required: true, minlength: 8, maxlength: 8 },
  user_street: { type: String, uppercase: true, required: true },
  user_number: { type: Number, required: true },
  user_complement: { type: String, uppercase: true, maxlength: 80 },
  user_district: { type: String, uppercase: true, required: true, maxlength: 80 },
  user_country: { type: String, uppercase: true, required: true },
  user_state: { type: String, uppercase: true, required: true, minlength: 2, maxlength: 2 },
  
  // Contato
  user_email: { type: String, lowercase: true, maxlength: 80 }, 
  user_phone: { type: String, required: true, minlength: 10, maxlength: 13 },
  
  // Informações da ONG
  user_registration_date: { type: String, required: true },
  user_education: { type: Number, required: true },
  user_type: [{ type: Number, required: true }], 
  user_free_period: [{ type: Number, required: true }], 
  user_activities: [{ type: Number }], 
  
  // Diversidade / Saúde
  user_color: { type: Number, required: true },
  user_physically_disabled: { type: Number, required: true }, 
  user_type_physically_disabled: { type: Number }, 
  
  // Menores de Idade
  user_minor: { type: Number, required: true }, 
  user_minor_name: { type: String, uppercase: true, maxlength: 80 },
  user_minor_rg: { type: String, maxlength: 10 },
  user_minor_cpf: { type: String, maxlength: 11 }
}, { 
  timestamps: true,
  strict: false // Evita erros 500 caso o frontend envie campos extras
});

export default mongoose.model('User', userSchema, 'users');