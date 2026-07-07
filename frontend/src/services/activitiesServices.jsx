import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function activitiesServices() {
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [refetchActivities, setRefetchActivities] = useState(true);
  const [activitiesList, setActivitiesList] = useState([]);
  const [userActivitiesList, setUserActivitiesList] = useState([]);
  const [activityNextMat, setActivityNextMat] = useState([]);
  const [activityTypeList, setActivityTypeList] = useState([]);

  const addActivity = (activityData) => {
    apiFetch("/activities", {
      method: "POST",
      body: JSON.stringify(activityData),
    })
      .then((result) => {
        //if (result.success) {
        //  setTablesList(result.body);
        //} else {
        //console.log(result);
        //}
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
      });
  };

  const getActivities = () => {
    setActivitiesLoading(true);

    apiFetch("/activities")
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

    apiFetch("/activities/activitiesByMat", {
      method: "POST",
      body: JSON.stringify({ user_activities: activities }),
    })
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

  const getActivitiesByType = (type) => {
    setActivitiesLoading(true);

    apiFetch("/activities/activitiesByType", {
      method: "POST",
      body: JSON.stringify({ activity_type: type }),
    })
      .then((result) => {
        if (result.success) {
          setActivityTypeList(result.body);
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

    apiFetch("/activities/nextMat")
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

    apiFetch(`/activities/${activityId}`, {
      method: "PUT",
      body: JSON.stringify(activityData)
    })
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

  return {
    addActivity,
    getActivities,
    getActivitiesByMat,
    getActivitiesByType,
    getActivityNextMat,
    updateActivity,
    activitiesLoading,
    refetchActivities,
    userActivitiesList,
    activitiesList,
    activityNextMat,
    activityTypeList
  };
}
