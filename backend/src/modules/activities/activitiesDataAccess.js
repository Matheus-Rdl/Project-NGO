import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "activities";

export default class ActivitiesDataAccess {
  async getActivities() {
    const result = await Mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  async getActivitiesByMat(activitiesMats) {
    const result = await Mongo.db
    .collection(collectionName)
    .find({activity_mat: {$in: activitiesMats} })
    .toArray();

    return result;
  }

  async getNextActivityMat() {
    const lastActivity = await Mongo.db
      .collection(collectionName)
      .aggregate([
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
      ])
      .toArray();

    let nextMat = "000001";

    if (lastActivity.length > 0 && lastActivity[0].activity_mat) {
      const lastMatNumber = parseInt(lastActivity[0].activity_mat, 10);
      const newMatNumber = lastMatNumber + 1;
      nextMat = String(newMatNumber).padStart(6, "0");
    }

    return nextMat;
  }

  async addActivity(activityData) {

    const normalizedData = {};
    for (const key in activityData) {
      normalizedData[key] =
        typeof activityData[key] === "string"
          ? activityData[key].toUpperCase()
          : activityData[key];
    }

    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(normalizedData);

    return result;
  }

  async deleteActivity(activityId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(activityId) });

    return result;
  }

  async updateActivity(activityId, activityData) {

    const normalizedData = {};
    for (const key in activityData) {
      normalizedData[key] =
        typeof activityData[key] === "string"
          ? activityData[key].toUpperCase()
          : activityData[key];
    }

    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate({ _id: new ObjectId(activityId) }, { $set: normalizedData });

    return result;
  }
}
