import CollectionsDataAccess from "./collectionsDataAccess.js";
import { ok, serverError } from "../../helpers/httpResponse.js";

export default class CollectionsControllers {
  constructor() {
    this.dataAccess = new CollectionsDataAccess();
  }

  async getCollections() {
    try {
      const collections = await this.dataAccess.getCollections();
      return ok(collections);
    } catch (error) {
      return serverError(error);
    }
  }

  async addCollection(collectionData) {
    try {
      const result = await this.dataAccess.addCollection(collectionData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async deleteCollection(collectionId) {
    try {
      const result = await this.dataAccess.deleteCollection(collectionId);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updateCollection(collectionId, collectionData) {
    try {
      const result = await this.dataAccess.updateCollection(collectionId, collectionData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
