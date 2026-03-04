import UsersSystemDataAccess from './usersSystemDataAccess.js'
import { ok, serverError } from "../../helpers/httpResponse.js"

export default class UsersControllers {
  constructor() {
    this.dataAccess = new UsersSystemDataAccess();
  }

  async getByMat(mat){
    try {
      const result = await this.dataAccess.getByMat();
      return ok(result)
    } catch (error) {
      return serverError(error);
    }
  }

}