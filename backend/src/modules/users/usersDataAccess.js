import User from '../../models/User.js';

export default class UsersDataAccess {
  // Pega todos os usuários
  async getUsers() {
    return await User.find({}).lean(); 
    // .lean() retorna um objeto JS puro (mais rápido), ideal para leitura
  }

  // Pega usuário específico
  async getUser(id) {
    return await User.findById(id).lean();
  }

  // Pega usuário por matrícula (se precisar)
  async getUserByMat(user_mat) {
    return await User.findOne({ user_mat }).lean();
  }

  // Adiciona novo usuário
  async addUser(userData) {
    const newUser = new User(userData);
    return await newUser.save(); // Validações e Uppercase acontecem aqui
  }

  // Atualiza um usuário
  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(
      id, 
      userData, 
      { new: true, runValidators: true } // new: retorna o novo objeto, runValidators: força as regras do Schema na edição
    );
  }

  // Deleta um usuário
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}