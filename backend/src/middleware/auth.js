/*
    Type: Middleware
    Description: Middleware de autenticação JWT para o Project-NGO.
    Valida tokens emitidos pelo Squamata-Login e injeta
    { uid, email, appSlug, tenantId } em req.user.
    Date: 06/07/2026
*/

import jwt from "jsonwebtoken";
import { JWT_SECRET, APP_SLUG } from "../config/app.js";

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      body: "Token de autenticação não fornecido.",
    });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Valida que o token é para ESTA aplicação
    if (decoded.appSlug !== APP_SLUG) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        body: "Token não autorizado para esta aplicação.",
      });
    }

    // Injeta os dados do utilizador autenticado no request
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      appSlug: decoded.appSlug,
      tenantId: decoded.tenantId,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        body: "Token expirado. Faça login novamente.",
      });
    }

    return res.status(401).json({
      success: false,
      statusCode: 401,
      body: "Token inválido.",
    });
  }
}
