import Field from "../../models/Field.js";

export default class FieldsDataAccess {

  async getFields() {
    // Usamos o .lean() aqui para enviar um JSON puro para o React, igual ao Mongo nativo e mantendo a performance
    const result = await Field.find({}).sort({ order: 1 }).lean();
    return result;
  }

  async addField(fieldData) {
    const field = new Field(fieldData);
    const result = await field.save();
    return result;
  }

  async deleteField(fieldId) {
    const result = await Field.findByIdAndDelete(fieldId);
    return result;
  }

  async updateField(fieldId, fieldData) {
    // Código corrigido para retornar os dados da base de dados e não de um controller
    const result = await Field.findByIdAndUpdate(
      fieldId,
      { $set: fieldData },
      { new: true }
    );
    return result;
  }

  async updateFieldsOrder(fields) {
    const operations = fields.map(field => {
      return {
        updateOne: {
          filter: { _id: field._id }, // O Mongoose converte para ObjectId automaticamente
          update: { $set: { order: field.order } }
        }
      };
    });

    // O Mongoose também suporta operações de bulkWrite nativamente
    const result = await Field.bulkWrite(operations);
    return result;
  }
}