import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "fields";

export default class FieldsDataAccess {

  //Pega todos os usuários da base
  async getFields() {
    const result = await Mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addField(fieldData) {
  
    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(fieldData);

    return result;
  }

  //Deleta um usuário
  async deleteField(fieldId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(fieldId) });

    return result;
  }

  //Atualiza dados do usuário
  async updateField(fieldId, fieldData) {

    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(fieldId) },
        { $set: fieldData }
      );

    return result;
  }
}
