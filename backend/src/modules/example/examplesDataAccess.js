import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const exampleName = "examples";

export default class ExamplesDataAccess {

  //Pega todos os usuários da base
  async getExamples() {
    const result = await Mongo.db.collection(exampleName).find({}).sort({ order: 1 }).toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addExample(exampleData) {
  
    const result = await Mongo.db
      .example(exampleName)
      .insertOne(exampleData);

    return result;
  }

  //Deleta um usuário
  async deleteExample(exampleId) {
    const result = await Mongo.db
      .example(exampleName)
      .findOneAndDelete({ _id: new ObjectId(exampleId) });

    return result;
  }

  //Atualiza dados do usuário
  async updateExample(exampleId, exampleData) {

    const result = Mongo.db
      .example(exampleName)
      .findOneAndUpdate(
        { _id: new ObjectId(exampleId) },
        { $set: exampleData }
      );

    return result;
  }
}
