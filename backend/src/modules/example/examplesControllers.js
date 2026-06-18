import ExamplesDataAccess from "./examplesDataAccess.js";
import { ok, serverError } from "../../helpers/httpResponse.js";

export default class ExamplesControllers {
  constructor() {
    this.dataAccess = new ExamplesDataAccess();
  }

  async getExamples() {
    try {
      const examples = await this.dataAccess.getExamples();
      return ok(examples);
    } catch (error) {
      return serverError(error);
    }
  }

  async addExample(exampleData) {
    try {
      const result = await this.dataAccess.addExample(exampleData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async deleteExample(exampleId) {
    try {
      const result = await this.dataAccess.deleteExample(exampleId);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updateExample(exampleId, exampleData) {
    try {
      const result = await this.dataAccess.updateExample(exampleId, exampleData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
