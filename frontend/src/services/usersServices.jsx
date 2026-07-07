import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function usersServices() {
  const [usersByType, setUsersByType] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userNextMat, setUserNextMat] = useState([]);
  const [userListActivies, setListUserActivies] = useState([]);

  const addUser = (userData) => {
    apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    setUsersLoading(true);

    apiFetch("/users")
      .then((result) => {
        if (result.success) {
          setUsersList(result.body);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const getUserNextMat = () => {
    apiFetch("/users/nextMat")
      .then((result) => {
        if (result.success) {
          setUserNextMat(result.body);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const getUsersByActivity = (activityMat) => {

    // Validação para impedir chamadas com undefined
    if (!activityMat) {
      console.warn(
        "getUsersByActivity recebeu activityMat inválido:",
        activityMat
      );
      return;
    }

    apiFetch(`/users/activity/${activityMat}`)
      .then((result) => {
        if (result.success) {
          setListUserActivies(result.body);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const getUsersByType = (typesArray) => {
    setUsersLoading(true);

    // transforma [2,4] em "2,4"
    const typesQuery = typesArray.join(",");

    apiFetch(`/users/type?types=${typesQuery}`)
      .then((result) => {
        if (result.success) {
          setUsersByType(result.body);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const updateUser = (userId, userData) => {

    console.log(userData);
    console.log(JSON.stringify(userData));

    apiFetch(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
      .then((result) => {
        if (!result.success) {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserActivities = (userId, activities) => {
    return fetch(`${url}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_activities: activities,
      }),
    });
  };

  return {
    addUser,
    getUsers,
    getUserNextMat,
    getUsersByActivity,
    getUsersByType,
    updateUser,
    updateUserActivities,
    usersLoading,
    refetchUsers,
    usersList,
    userNextMat,
    userListActivies,
    usersByType,
  };
}