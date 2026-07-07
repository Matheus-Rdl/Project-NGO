/*
    Type: Utils
    Description: Helper para chamadas à API do Project-NGO.
    Injeta automaticamente o token JWT no header Authorization
    e trata erros 401 (token expirado) redirecionando para o SSO.
    Date: 06/07/2026
*/

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const SQUAMATA_FRONTEND_URL = import.meta.env.VITE_SQUAMATA_FRONTEND_URL || "http://localhost:5174";

function getToken() {
  try {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored).token : null;
  } catch {
    return null;
  }
}

function redirectToSSO() {
  localStorage.removeItem("auth");
  const returnUrl = window.location.href;
  const ssoUrl = `${SQUAMATA_FRONTEND_URL}/login?appSlug=project-ngo&tenantId=default&returnUrl=${encodeURIComponent(returnUrl)}`;
  window.location.href = ssoUrl;
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    redirectToSSO();
    throw new Error("Não autorizado — token expirado ou inválido.");
  }

  if (res.status === 403) {
    throw new Error("Acesso negado a este recurso.");
  }

  return res.json();
}

export { API_URL, SQUAMATA_FRONTEND_URL };
