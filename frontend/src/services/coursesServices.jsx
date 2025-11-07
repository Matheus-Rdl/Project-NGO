import { useState } from "react";

export default function coursesServices() {
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [refetchCourses, setRefetchCourses] = useState(true);
  const [coursesList, setCoursesList] = useState([]);
  const [courseNextMat, setCourseNextMat] = useState([]);

  const url = "http://localhost:3000/courses";

  const addCourse = (courseData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => response.json())
      .then((result) => {
        //if (result.success) {
        //  setTablesList(result.body);
        //} else {
        console.log(result);
        //}
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  };

  const getCourses = () => {
    setCoursesLoading(true);

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCoursesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setCoursesLoading(false);
        setRefetchCourses(false);
      });
  };

  const getCourseNextMat = () => {

    fetch(`${url}/nextMat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCourseNextMat(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setCoursesLoading(false);
        setRefetchCourses(false);
      });
  };

  const updateCourse = (courseId, courseData) => {

    console.log(courseData)
    console.log(JSON.stringify(courseData))

    fetch(`${url}/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body : JSON.stringify(courseData)
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
      });
  };

  return { addCourse, getCourses, getCourseNextMat, updateCourse, coursesLoading, refetchCourses, coursesList, courseNextMat };
}
