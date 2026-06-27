import bcrypt from 'bcrypt';
import UsersSystemDataAccess from './usersSystemDataAccess.js';
import { ok, serverError } from "../../helpers/httpResponse.js";

export default class UsersControllers {
  constructor() {
    this.dataAccess = new UsersSystemDataAccess();
  }

  async getByMat(mat) {
    console.log(mat);
    try {
      const result = await this.dataAccess.getByMat(mat);

      if (!result) {
        return {
          success: false,
          statusCode: 404,
          body: "Usuário não encontrado"
        };
      }

      return ok(result);
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
    console.log("Tentativa de login para:", data.user_system_name);
    try {
      const { user_system_name, user_system_password } = data;

      const user = await this.dataAccess.getByName(user_system_name);

      if (!user) {
        console.log("Usuário não encontrado no banco");
        return {
          success: false,
          statusCode: 401,
          body: "Usuário não encontrado"
        };
      }

      // CORREÇÃO AQUI: Comparação segura de hash com bcrypt
      const isMatch = await bcrypt.compare(user_system_password, user.user_system_password);

      if (!isMatch) {
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
      console.error("Erro no login:", error);
      return serverError(error);
    }
  }
}