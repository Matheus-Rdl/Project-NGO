import UserSystem from '../../models/UserSystem.js';

export default class UsersSystemDataAccess {

  async getByMat(mat) {
    return await UserSystem.findOne({ user_system_mat: mat }).lean();
  }

  async upsertByMat(mat, data) {
    // Mantemos a segurança de remover o _id caso ele venha no payload
    const { _id, ...dataWithoutId } = data;

    const result = await UserSystem.findOneAndUpdate(
      { user_system_mat: mat },
      { $set: dataWithoutId },
      {
        new: true, // Retorna o documento modificado (equivale ao returnDocument: "after")
        upsert: true, // Cria um novo se não encontrar
        runValidators: true // Garante que as regras do Schema sejam aplicadas no update
      }
    ).lean();

    return result;
  }

  async getByName(name) {
    console.log("Procurando por nome:", name);
    const user = await UserSystem.findOne({ user_system_name: name }).lean();
    console.log("Resultado da busca:", user); // Retornou null ou o objeto?
    return user;
  }
}