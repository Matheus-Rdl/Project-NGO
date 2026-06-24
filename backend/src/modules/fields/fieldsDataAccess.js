import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "fields";

export default class FieldsDataAccess {

  //Pega todos os usuários da base
  async getFields() {
    const result = await Mongo.db.collection(collectionName).find({}).sort({ order: 1 }).toArray();

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
    console.log("UPDATE FIELD:", fieldId);

    try {
      const result = await this.dataAccess.updateField(fieldId, fieldData);
      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }

  async updateFieldsOrder(fields) {
    console.log("UPDATE FIELDS:", fields);

    const operations = fields.map(field => {

      console.log(
        "ID:",
        field._id,
        "TIPO:",
        typeof field._id
      );

      return {
        updateOne: {
          filter: {
            _id: new ObjectId(field._id)
          },
          update: {
            $set: {
              order: field.order
            }
          }
        }
      };
    });

    return await Mongo.db
      .collection(collectionName)
      .bulkWrite(operations);
  }
}
