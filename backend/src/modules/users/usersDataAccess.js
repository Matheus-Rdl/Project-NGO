import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "users";

export default class UsersDataAccess {

  //Pega todos os usuários da base
  async getUsers() {
    const result = await Mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  //Pega proxima matricula que será utulizada no sistema
  async getNextUserMat() {
    const lastUser = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: { user_mat: { $exists: true } },
        },
        {
          $addFields: { userMatNumber: { $toInt: "$user_mat" } },
        },
        {
          $sort: { userMatNumber: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    let nextMat = "000001";

    if (lastUser.length > 0 && lastUser[0].user_mat) {
      const lastMatNumber = parseInt(lastUser[0].user_mat, 10);
      const newMatNumber = lastMatNumber + 1;
      nextMat = String(newMatNumber).padStart(6, "0");
    }

    return nextMat;
  }

  async getUsersByActivity(activityMat) {
    const result = await Mongo.db
      .collection(collectionName)
      .find({ user_activities: { $in: [activityMat] } })
      //{ projection: { user_mat: 1, user_name: 1, user_activities: 1 } })
      .toArray();

    return result;
  }

  async getUsersByType(typesArray) {
    const result = await Mongo.db
      .collection(collectionName)
      .find({
        user_type: { $in: typesArray }
      })
      .toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addUser(userData) {

    const normalizedData = {};
    for (const key in userData) {
      normalizedData[key] =
        typeof userData[key] === "string"
          ? userData[key].toUpperCase()
          : userData[key];
    }

    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(normalizedData);

    return result;
  }

  //Deleta um usuário
  async deleteUser(userId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(userId) });

    return result;
  }

  //Atualiza dados do usuário
  async updateUser(userId, userData) {

    const normalizedData = {};
    for (const key in userData) {
      normalizedData[key] =
        typeof userData[key] === "string"
          ? userData[key].toUpperCase()
          : userData[key];
    }

    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: normalizedData }
      );

    return result;
  }
}
