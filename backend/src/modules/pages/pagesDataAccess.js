import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const pageName = "pages";

export default class PagesDataAccess {

  //Pega todos os usuários da base
  async getPages() {
    const result = await Mongo.db.collection(pageName).find({}).sort({ order: 1 }).toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addPage(pageData) {
  
    const result = await Mongo.db
      .page(pageName)
      .insertOne(pageData);

    return result;
  }

  //Deleta um usuário
  async deletePage(pageId) {
    const result = await Mongo.db
      .page(pageName)
      .findOneAndDelete({ _id: new ObjectId(pageId) });

    return result;
  }

  //Atualiza dados do usuário
  async updatePage(pageId, pageData) {

    const result = Mongo.db
      .page(pageName)
      .findOneAndUpdate(
        { _id: new ObjectId(pageId) },
        { $set: pageData }
      );

    return result;
  }
}
