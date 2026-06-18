import PagesDataAccess from "./pagesDataAccess.js";
import { ok, serverError } from "../../helpers/httpResponse.js";

export default class PagesControllers {
  constructor() {
    this.dataAccess = new PagesDataAccess();
  }

  async getPages() {
    try {
      const pages = await this.dataAccess.getPages();
      return ok(pages);
    } catch (error) {
      return serverError(error);
    }
  }

  async addPage(pageData) {
    try {
      const result = await this.dataAccess.addPage(pageData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async deletePage(pageId) {
    try {
      const result = await this.dataAccess.deletePage(pageId);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updatePage(pageId, pageData) {
    try {
      const result = await this.dataAccess.updatePage(pageId, pageData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
