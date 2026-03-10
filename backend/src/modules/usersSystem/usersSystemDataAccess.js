import { Mongo } from "../../database/mongo.js";
import { ObjectId, ReturnDocument } from "mongodb";

const collectionName = "users_system"

export default class UsersSystemDataAccess {
  async getByMat(mat) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOne({ user_system_mat: mat });
    return result;
  }

  async upsertByMat(mat, data) {

    // Remover campos imutáveis
    const { _id, ...dataWithoutId } = data;

    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { user_system_mat: mat },
        { $set: dataWithoutId },
        { upsert: true, returnDocument: "after" }
      );

    return result.value;
  }

  async getByName(name) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOne({ user_system_name: name });

    return result;
  }
}