import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "users";

export default class UsersDataAccess {
  async getUsers() {
    const result = await Mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  async getNextUserMat() {
    const lastUser = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: { mat: { $exists: true } },
        },
        {
          $addFields: { matNumber: { $toInt: "$mat" } },
        },
        {
          $sort: { matNumber: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    let nextMat = "000001";

    if (lastUser.length > 0 && lastUser[0].mat) {
      const lastMatNumber = parseInt(lastUser[0].mat, 10);
      const newMatNumber = lastMatNumber + 1;
      nextMat = String(newMatNumber).padStart(6, "0");
    }

    return nextMat;
  }

  async addUser(userData) {
    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(userData);

    return result;
  }

  async deleteUser(userId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(userId) });

    return result;
  }

  async updateUser(userId, userData) {
    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: userData });

    return result;
  }
}
