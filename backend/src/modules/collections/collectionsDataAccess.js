import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "collections";

export default class CollectionsDataAccess {

  //Pega todos os usuários da base
  async getCollections() {
    const result = await Mongo.db.collection(collectionName).find({}).sort({ order: 1 }).toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addCollection(collectionData) {
  
    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(collectionData);

    return result;
  }

  //Deleta um usuário
  async deleteCollection(collectionId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(collectionId) });

    return result;
  }

  //Atualiza dados do usuário
  async updateCollection(collectionId, collectionData) {

    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(collectionId) },
        { $set: collectionData }
      );

    return result;
  }
}
