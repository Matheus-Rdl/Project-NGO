import User from '../../models/User.js';

export default class UsersDataAccess {
  // Pega todos os usuários
  async getUsers() {
    return await User.find({}).lean(); 
  }

  // Pega usuário específico
  async getUser(id) {
    return await User.findById(id).lean();
  }

  // Pega usuário por matrícula
  async getUserByMat(user_mat) {
    return await User.findOne({ user_mat }).lean();
  }

  // Pega a próxima matrícula (lógica de agregação adaptada para Mongoose)
  async getNextUserMat() {
    const lastUser = await User.aggregate([
      { $match: { user_mat: { $exists: true } } },
      { $addFields: { userMatNumber: { $toInt: "$user_mat" } } },
      { $sort: { userMatNumber: -1 } },
      { $limit: 1 }
    ]);

    let nextMat = "000001";
    if (lastUser.length > 0 && lastUser[0].user_mat) {
      const lastMatNumber = parseInt(lastUser[0].user_mat, 10);
      nextMat = String(lastMatNumber + 1).padStart(6, "0");
    }
    return nextMat;
  }

  // Busca usuários por atividade
  async getUsersByActivity(activityMat) {
    // Como os IDs das atividades geralmente vêm como strings do param da URL, passamos para int
    return await User.find({ user_activities: parseInt(activityMat, 10) }).lean();
  }

  // Busca usuários por tipo
  async getUsersByType(typesArray) {
    return await User.find({ user_type: { $in: typesArray } }).lean();
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
      { $set: userData }, 
      { new: true, runValidators: true }
    );
  }

  // Deleta um usuário
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}