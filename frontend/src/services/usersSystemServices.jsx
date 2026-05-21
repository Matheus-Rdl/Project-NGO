export default function userSystemServices() {
  const url = `${import.meta.env.VITE_API_URL}/users-system`;

  console.log(import.meta.env.VITE_API_URL)

  const getUserSystemByMat = (mat) => {
    return fetch(`${url}/mat/${mat}`).then(res => res.json());
  };

  const upsertUserSystem = (mat, data) => {
    return fetch(`${url}/mat/${mat}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  };

  const login = (data) => {
    return fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  };

  return { getUserSystemByMat, upsertUserSystem, login };
}