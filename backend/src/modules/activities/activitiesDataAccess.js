import Activity from "../../models/Activity.js";

export default class ActivitiesDataAccess {
  async getActivities() {
    // O Mongoose devolve os resultados de forma mais direta, dispensando o .toArray()
    const result = await Activity.find({});
    return result;
  }

  async getActivitiesByMat(activitiesMats) {
    const result = await Activity.find({ activity_mat: { $in: activitiesMats } });
    return result;
  }

  async getActivitiesByType(activityType) {
    const result = await Activity.find({ activity_type: { $in: activityType } });
    return result;
  }

  async getNextActivityMat() {
    // Podemos manter a agregação quase intacta, o Mongoose suporta chamadas nativas como aggregate
    const lastActivity = await Activity.aggregate([
      {
        $match: { activity_mat: { $exists: true } },
      },
      {
        $addFields: { activityMatNumber: { $toInt: "$activity_mat" } },
      },
      {
        $sort: { activityMatNumber: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    let nextMat = "000001";

    if (lastActivity.length > 0 && lastActivity[0].activity_mat) {
      const lastMatNumber = parseInt(lastActivity[0].activity_mat, 10);
      const newMatNumber = lastMatNumber + 1;
      nextMat = String(newMatNumber).padStart(6, "0");
    }

    return nextMat;
  }

  async addActivity(activityData) {
    // O Mongoose encarrega-se da normalização e formatação (uppercase, limpeza de campos indesejados, etc.)
    const activity = new Activity(activityData);
    const result = await activity.save();
    return result;
  }

  async deleteActivity(activityId) {
    // findByIdAndDelete abstrai a necessidade de instanciar 'new ObjectId()'
    const result = await Activity.findByIdAndDelete(activityId);
    return result;
  }

  async updateActivity(activityId, activityData) {
    // A opção { new: true } devolve o documento já atualizado na resposta
    const result = await Activity.findByIdAndUpdate(
      activityId, 
      { $set: activityData },
      { new: true, runValidators: true } 
    );
    return result;
  }
}