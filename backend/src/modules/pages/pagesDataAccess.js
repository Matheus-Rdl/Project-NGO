import Page from "../../models/Page.js";

export default class PagesDataAccess {

  // Pega todas as páginas configuradas no sistema
  async getPages() {
    // Busca ordenando pela propriedade 'order' e retorna como JSON puro
    return await Page.find({}).sort({ order: 1 }).lean();
  }

  // Adiciona uma nova configuração de página
  async addPage(pageData) {
    const page = new Page(pageData);
    return await page.save();
  }

  // Deleta uma página pelo ID do documento
  async deletePage(pageId) {
    return await Page.findByIdAndDelete(pageId);
  }

  // Atualiza os dados de configuração de uma página específica
  async updatePage(pageId, pageData) {
    return await Page.findByIdAndUpdate(
      pageId,
      { $set: pageData },
      { new: true } // Retorna o documento já com as alterações
    );
  }
}