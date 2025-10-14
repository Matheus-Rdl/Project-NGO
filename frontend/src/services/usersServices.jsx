import { useState } from "react";

export default function usersServices() {
  const [usersLoading, setUsersLoading] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userNextMat, setUserNextMat] = useState([]);

  const url = "http://localhost:3000/users";

  const getUsers = (userId) => {
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

    const getUserNextMat = (userId) => {

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

  return { getUsers, getUserNextMat, usersLoading, refetchUsers, usersList, userNextMat };
}
