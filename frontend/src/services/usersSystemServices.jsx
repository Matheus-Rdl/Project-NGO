import { apiFetch } from "../utils/api.js";

export default function userSystemServices() {

  const getUserSystemByMat = (mat) => {
    return apiFetch(`/users-system/mat/${mat}`);
  };

  const upsertUserSystem = (mat, data) => {
    return apiFetch(`/users-system/mat/${mat}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  };

  // login() removido — autenticação migrada para Squamata-Login (SSO)

  return { getUserSystemByMat, upsertUserSystem };
}