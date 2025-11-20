import { useState } from "react";

export default function activitiesServices() {
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [refetchActivities, setRefetchActivities] = useState(true);
  const [activitiesList, setActivitiesList] = useState([]);
  const [userActivitiesList, setUserActivitiesList] = useState([]);
  const [activityNextMat, setActivityNextMat] = useState([]);

  const url = "http://localhost:3000/activities";

  const addActivity = (activityData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(activityData),
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

  const getActivities = () => {
    setActivitiesLoading(true);

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
          setActivitiesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setActivitiesLoading(false);
        setRefetchActivities(false);
      });
  };

  const getActivitiesByMat = (activities) => {
    setActivitiesLoading(true);

    fetch(`${url}/activitiesByMat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ user_activities: activities }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setUserActivitiesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setActivitiesLoading(false);
        setRefetchActivities(false);
      });
  };

  const getActivityNextMat = () => {

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
          setActivityNextMat(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setActivitiesLoading(false);
        setRefetchActivities(false);
      });
  };

  const updateActivity = (activityId, activityData) => {

    console.log(activityData)
    console.log(JSON.stringify(activityData))

    fetch(`${url}/${activityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body : JSON.stringify(activityData)
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

  return { addActivity, getActivities, getActivitiesByMat, getActivityNextMat, updateActivity, activitiesLoading, refetchActivities, userActivitiesList, activitiesList, activityNextMat };
}
