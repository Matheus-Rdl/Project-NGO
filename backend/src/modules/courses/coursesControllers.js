import CoursesDataAccess from "./coursesDataAccess.js";
import { ok, serverError } from "../../helpers/httpResponse.js";

export default class CoursesControllers {
  constructor() {
    this.dataAccess = new CoursesDataAccess();
  }

  async getCourses() {
    try {
      const courses = await this.dataAccess.getCourses();
      return ok(courses);
    } catch (error) {
      return serverError(error);
    }
  }

  async getNextCourseMat() {
    try {
      const nextMat = await this.dataAccess.getNextCourseMat();
      return ok(nextMat);
    } catch (error) {
      return serverError(error);
    }
  }

  async addCourse(courseData) {
    try {
      const result = await this.dataAccess.addCourse(courseData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async deleteCourse(courseId) {
    try {
      const result = await this.dataAccess.deleteCourse(courseId);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updateCourse(courseId, courseData) {
    try {
      const result = await this.dataAccess.updateCourse(courseId, courseData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
