import { useState } from "react";

export default function usersServices() {
  const [usersByType, setUsersByType] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userNextMat, setUserNextMat] = useState([]);
  const [userListActivies, setListUserActivies] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/users`;

  const addUser = (userData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
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

  const getUsers = () => {
    setUsersLoading(true);

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
          setUsersList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const getUserNextMat = () => {

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
          setUserNextMat(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setUsersLoading(false);
        setRefetchUsers(false);
      });
  };

  const getUsersByActivity = (activityMat) => {

    fetch(`${url}/activity/${activityMat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setListUserActivies(result.body);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
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

    fetch(`${url}/type?types=${typesQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
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

    console.log(userData)
    console.log(JSON.stringify(userData))

    fetch(`${url}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData)
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
    usersByType
  };
}
