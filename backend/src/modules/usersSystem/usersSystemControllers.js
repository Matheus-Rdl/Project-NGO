import UsersSystemDataAccess from './usersSystemDataAccess.js'
import { ok, serverError } from "../../helpers/httpResponse.js"

export default class UsersControllers {
  constructor() {
    this.dataAccess = new UsersSystemDataAccess();
  }

  async getByMat(mat) {
    console.log(mat)
    try {
      const result = await this.dataAccess.getByMat(mat);

      if (!result) {
        return {
          success: false,
          statusCode: 404,
          body: "Usuário não encontrado"
        };
      }

      return ok(result)
    } catch (error) {
      return serverError(error);
    }
  }

  async upsertByMat(mat, data) {
    try {
      const result = await this.dataAccess.upsertByMat(mat, data);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async login(data) {
    try {

      const { user_system_name, user_system_password } = data;

      const user = await this.dataAccess.getByName(user_system_name);

      if (!user) {
        return {
          success: false,
          statusCode: 401,
          body: "Usuário não encontrado"
        };
      }

      if (user.user_system_password !== user_system_password) {
        return {
          success: false,
          statusCode: 401,
          body: "Senha incorreta"
        };
      }

      return ok({
        message: "Login realizado com sucesso",
        user: user
      });

    } catch (error) {
      return serverError(error);
    }
  }
}