/*
    Type: Config
    Description: Constantes da aplicação Project-NGO.
    Centraliza slugs, tenant default e chaves de configuração.
    Date: 06/07/2026
*/

export const APP_SLUG = process.env.APP_SLUG || "project-ngo";
export const TENANT_DEFAULT = "default";
export const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_calango_inc";
export const SQUAMATA_API_URL = process.env.SQUAMATA_API_URL || "http://squamata-login-backend:3001/api/v1";
