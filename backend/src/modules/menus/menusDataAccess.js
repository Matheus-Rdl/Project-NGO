import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const menuName = "menus";

export default class MenusDataAccess {

  //Pega todos os usuários da base
  async getMenus() {
    const result = await Mongo.db.collection(menuName).find({}).sort({ order: 1 }).toArray();

    return result;
  }

  //Adiciona um usuário no sistema
  async addMenu(menuData) {
  
    const result = await Mongo.db
      .menu(menuName)
      .insertOne(menuData);

    return result;
  }

  //Deleta um usuário
  async deleteMenu(menuId) {
    const result = await Mongo.db
      .menu(menuName)
      .findOneAndDelete({ _id: new ObjectId(menuId) });

    return result;
  }

  //Atualiza dados do usuário
  async updateMenu(menuId, menuData) {

    const result = Mongo.db
      .menu(menuName)
      .findOneAndUpdate(
        { _id: new ObjectId(menuId) },
        { $set: menuData }
      );

    return result;
  }
}
