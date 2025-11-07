import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "courses";

export default class CoursesDataAccess {
  async getCourses() {
    const result = await Mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  async getNextCourseMat() {
    const lastCourse = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: { course_mat: { $exists: true } },
        },
        {
          $addFields: { courseMatNumber: { $toInt: "$course_mat" } },
        },
        {
          $sort: { courseMatNumber: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    let nextMat = "000001";

    if (lastCourse.length > 0 && lastCourse[0].course_mat) {
      const lastMatNumber = parseInt(lastCourse[0].course_mat, 10);
      const newMatNumber = lastMatNumber + 1;
      nextMat = String(newMatNumber).padStart(6, "0");
    }

    return nextMat;
  }

  async addCourse(courseData) {
    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(courseData);

    return result;
  }

  async deleteCourse(courseId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(courseId) });

    return result;
  }

  async updateCourse(courseId, courseData) {
    const result = Mongo.db
      .collection(collectionName)
      .findOneAndUpdate({ _id: new ObjectId(courseId) }, { $set: courseData });

    return result;
  }
}
