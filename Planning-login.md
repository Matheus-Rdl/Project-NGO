# 🔍 Análise Completa: Integração Project-NGO ↔ Squamata-Login (SSO)

> **Status:** Em planeamento | **Data:** 2026-07-06
>
> Legenda: ⬜ Por fazer | 🟡 Em progresso | ✅ Concluído | ❌ Bloqueado

---

## 0. Descoberta e Decisão de Arquitetura sobre o Fluxo SSO

O Squamata-Login **frontend** (`Login.jsx`) atualmente só faz redirect automático pós-login para `calango-food`:

```js
// Squamata frontend — ÚNICO redirect automático que existe:
if (appSlug === 'calango-food') {
  window.location.href = `${VITE_CALANGO_FOOD_URL}/auth/callback?token=...`;
  return;
}
// Para qualquer outro appSlug (ex: "project-ngo"), o utilizador FICA parado no Squamata.
```

Isto impede o fluxo SSO ideal descrito na `Architecture.md` do ecossistema:

> 2. Caso não possua um token válido local, a aplicação o redireciona para o frontend do SSO passando parâmetros via query string:
> `http://localhost:5174/login?appSlug=marianos-meat&tenantId=default&returnUrl=http://localhost:5175`
> 4. Após a validação, o backend realiza o redirecionamento dinâmico estritamente para a URL informada no `returnUrl`, anexando o token JWT gerado.

### Decisão: Ajustes Mínimos no Squamata-Login

Para viabilizar o fluxo SSO completo **sem quebrar o `calango-food`** e mantendo as alterações no Squamata ao mínimo absoluto, vamos fazer 3 alterações pontuais **apenas no frontend do Squamata** (`Login.jsx`):

| # | Onde | O quê | Impacto |
|---|------|-------|---------|
| 1 | `Login.jsx` — `useEffect` inicial | Ler `returnUrl` dos query params e guardar em `localStorage` | Permite saber para onde redirecionar após login |
| 2 | `Login.jsx` — callback Google OAuth | Trocar `if (finalSlug === 'calango-food')` por `if (returnUrl)` genérico | Qualquer app recebe redirect, não só `calango-food` |
| 3 | `Login.jsx` — `handleAuth` (email/senha) | Trocar `if (appSlug === 'calango-food')` por `if (returnUrl)` genérico | Idem para login por email/senha |

**Backend do Squamata: ZERO alterações.** O backend continua a devolver JSON; o frontend é que passa a redirecionar genericamente.

**`calango-food` continua a funcionar** porque o `VITE_CALANGO_FOOD_URL` é essencialmente o `returnUrl` hardcoded que estava antes — a diferença é que agora qualquer app pode passar o seu próprio `returnUrl`.

---

## 1. Diagnóstico do Estado Atual do Project-NGO

### 🔴 Problemas Críticos Encontrados

| # | Problema | Impacto | Causa raiz |
|---|----------|---------|------------|
| **P1** | 🔴 Refresh da página = logout | Usuário perde a sessão ao dar F5 | `sessionStorage` é limpo no reload da aba |
| **P2** | 🔴 Zero autenticação no backend | Todas as rotas são públicas | Nenhum middleware de auth nas rotas |
| **P3** | 🔴 Sem tokens JWT | Backend não emite nem valida tokens | Login devolve hash da password no response |
| **P4** | 🔴 Hash da senha exposto no frontend | Grave falha de segurança | `POST /users-system/login` retorna `user` completo |
| **P5** | 🟡 Botão "Sair" não funciona | Header só dá `console.log("Sair do Sistema")` | Nunca implementado corretamente |
| **P6** | 🔴 Nenhum header Authorization nos fetchs | Chamadas à API sem autenticação | Todos os serviços usam apenas `Content-Type` |
| **P7** | 🔴 Sem tenantID | Sistema não suporta multi-tenancy | Conceito nunca implementado |
| **P8** | 🟡 Modelo User vs UserSystem confuso | User=beneficiário, UserSystem=conta sistema | Modelagem legada acoplada por `user_system_mat` ↔ `user_mat` |

### 🟢 O que já está correto

- ✅ Backend usa **ESM** (`import`/`export`) — compatível com o padrão Squamata
- ✅ Backend já tem `cors` com `credentials: true` e `allowedHeaders: ["Authorization"]`
- ✅ Frontend já migrado para **Chakra UI v3** + **React Router v7** (hash router)
- ✅ `docker-compose.yml` já está na rede `squamata-global` (external)
- ✅ `ProtectedRoute` já existe como componente
- ✅ Squamata-Login backend tem CORS aberto (`cors()` sem restrições)

---

## 2. Como o Squamata-Login Funciona

### Fluxo SSO — Com Redirect via Squamata Frontend (Abordagem Final)

```
  1. Usuário acessa Project-NGO (http://localhost:3011)
  2. ProtectedRoute detecta que não há token
  3. Redireciona para Squamata-Login:
     http://localhost:5174/login?appSlug=project-ngo&tenantId=default&returnUrl=http://localhost:3011
     
  4. Squamata frontend guarda returnUrl em localStorage
  5. Utilizador faz login no Squamata (email/senha ou Google OAuth)
  6. Squamata frontend redireciona DE VOLTA:
     http://localhost:3011?token=<JWT>&user=<encoded>
     
  7. Project-NGO extrai token da URL → armazena em localStorage → limpa URL
  8. Project-NGO envia token no header Authorization em TODAS as chamadas à API
     Header: Authorization: Bearer <JWT>
  9. Backend do Project-NGO valida JWT com o mesmo JWT_SECRET
 10. Backend extrai { uid, email, appSlug, tenantId } → isola dados por tenantId
```

> 💡 **Nota para desenvolvimento local:** Para testes sem Docker, usar `http://localhost:5174` (Squamata frontend) e `http://localhost:5173` (Project-NGO frontend Vite dev server). Em produção com Docker, usar as portas reais (`:5174` e `:3011`).

### Estrutura do JWT emitido pelo Squamata-Login

```json
{
  "uid": "60f7...", 
  "email": "usuario@email.com",
  "appSlug": "project-ngo",
  "tenantId": "default",
  "iat": ...,
  "exp": ...
}
```

---

## 3. Plano de Ação — Checklist Passo a Passo

---

### 🔷 ETAPA 0 — Ajustes Mínimos no Squamata-Login (Frontend apenas)

> 📁 Único ficheiro a alterar:
> `/home/rodrigovmoreira/Calango_Project/Squamata-login/packages/frontend/src/pages/Login.jsx`
>
> 🎯 Objetivo: Substituir o redirect hardcoded para `calango-food` por um redirect genérico baseado no parâmetro `returnUrl`.

#### 0.1 — Capturar `returnUrl` dos query params no arranque
- [ ] ⬜ **0.1.1** — No `useEffect` inicial do `Login.jsx`, adicionar leitura do `returnUrl`:
  ```js
  const returnUrl = params.get('returnUrl');
  if (returnUrl) localStorage.setItem('sso_return_url', returnUrl);
  ```
- [ ] ⬜ **0.1.2** — Colocar **antes** do bloco `if (token)` (pista de pouso), para que o `returnUrl` esteja disponível quando o token chegar do Google OAuth

#### 0.2 — Tornar o redirect pós-login genérico (Google OAuth callback)
- [ ] ⬜ **0.2.1** — Localizar o bloco `if (finalSlug === 'calango-food')` dentro do `if (token)` (pista de pouso)
- [ ] ⬜ **0.2.2** — Substituir por:
  ```js
  // Antes (hardcoded apenas para calango-food):
  if (finalSlug === 'calango-food') {
    localStorage.removeItem('sso_target_slug');
    localStorage.removeItem('sso_target_tenant');
    window.location.href = `${import.meta.env.VITE_CALANGO_FOOD_URL || 'http://localhost:5173'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    return;
  }

  // Depois (genérico — qualquer app com returnUrl):
  const ssoReturnUrl = localStorage.getItem('sso_return_url');
  if (ssoReturnUrl) {
    localStorage.removeItem('sso_target_slug');
    localStorage.removeItem('sso_target_tenant');
    localStorage.removeItem('sso_return_url');
    window.location.href = `${ssoReturnUrl}?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    return;
  }
  ```
- [ ] ⬜ **0.2.3** — Verificar que `calango-food` continua a funcionar (basta que passe `returnUrl` nos query params como qualquer outra app)

#### 0.3 — Tornar o redirect pós-login genérico (Email/Senha)
- [ ] ⬜ **0.3.1** — Localizar o bloco `if (appSlug === 'calango-food')` dentro do `handleAuth` (após `login()`/`register()` bem-sucedido)
- [ ] ⬜ **0.3.2** — Substituir por:
  ```js
  // Antes (hardcoded apenas para calango-food):
  if (appSlug === 'calango-food') {
    window.location.href = `${import.meta.env.VITE_CALANGO_FOOD_URL || 'http://localhost:5173'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    return;
  }

  // Depois (genérico — qualquer app com returnUrl):
  const ssoReturnUrl = localStorage.getItem('sso_return_url');
  if (ssoReturnUrl) {
    localStorage.removeItem('sso_return_url');
    window.location.href = `${ssoReturnUrl}?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    return;
  }
  ```
- [ ] ⬜ **0.3.3** — Testar: aceder a `http://localhost:5174/login?appSlug=project-ngo&tenantId=default&returnUrl=http://localhost:5173`, fazer login → deve redirecionar para `http://localhost:5173?token=...`

#### 0.4 — Limpeza da chave `sso_return_url` em caso de erro
- [ ] ⬜ **0.4.1** — No bloco `if (error)` (captura de erros do Google OAuth), adicionar:
  ```js
  localStorage.removeItem('sso_return_url');
  ```

> 💡 **Resumo:** ~20 linhas modificadas em 1 único ficheiro. Zero alterações no backend do Squamata. Totalmente retrocompatível com `calango-food`.

---

### 🔷 ETAPA 1 — Infraestrutura e Configuração Base

#### 1.1 — Backend: Adicionar dependência `jsonwebtoken`
- [ ] ⬜ **1.1.1** — Executar `npm install jsonwebtoken` na pasta `backend/`
- [ ] ⬜ **1.1.2** — Confirmar que `jsonwebtoken` aparece no `package.json`

#### 1.2 — Backend: Configurar variáveis de ambiente
- [ ] ⬜ **1.2.1** — Adicionar `JWT_SECRET` ao `.env` do Project-NGO (mesmo valor do Squamata-Login: `super_secret_jwt_key_calango_inc` enquanto não houver vault partilhado)
- [ ] ⬜ **1.2.2** — Adicionar `SQUAMATA_API_URL=http://squamata-login-backend:3001/api/v1` ao `.env`
- [ ] ⬜ **1.2.3** — Adicionar `APP_SLUG=project-ngo` ao `.env`

#### 1.3 — Backend: Criar rota de healthcheck
- [ ] ⬜ **1.3.1** — Adicionar `GET /health` em `backend/src/index.js` que retorna `{ status: "UP", app: "project-ngo" }`
- [ ] ⬜ **1.3.2** — Testar: `curl http://localhost:3010/health`

#### 1.4 — Docker: Adicionar healthcheck ao backend
- [ ] ⬜ **1.4.1** — Adicionar `healthcheck` no serviço `ngo-backend` do `docker-compose.yml`
- [ ] ⬜ **1.4.2** — Testar com `docker ps` para ver o status healthy

#### 1.5 — Backend: Criar ficheiro de constantes da aplicação
- [ ] ⬜ **1.5.1** — Criar `backend/src/config/app.js` com:
  ```js
  export const APP_SLUG = process.env.APP_SLUG || "project-ngo";
  export const TENANT_DEFAULT = "default";
  export const JWT_SECRET = process.env.JWT_SECRET;
  export const SQUAMATA_API_URL = process.env.SQUAMATA_API_URL;
  ```

---

### 🔷 ETAPA 2 — Middleware de Autenticação no Backend

#### 2.1 — Criar ficheiro do middleware de autenticação
- [ ] ⬜ **2.1.1** — Criar `backend/src/middleware/auth.js`
- [ ] ⬜ **2.1.2** — Implementar função `authMiddleware`:
  - Extrai token do header `Authorization: Bearer <token>`
  - Valida JWT com `jwt.verify(token, JWT_SECRET)`
  - Verifica que `decoded.appSlug === "project-ngo"`
  - Injeta `req.user = { uid, email, appSlug, tenantId }`
  - Retorna 401 se token ausente/inválido/expirado
  - Retorna 403 se `appSlug` não corresponder
- [ ] ⬜ **2.1.3** — Criar `backend/src/middleware/index.js` que reexporta os middlewares

#### 2.2 — Aplicar middleware em todas as rotas do backend
- [ ] ⬜ **2.2.1** — Em `backend/src/index.js`, importar `authMiddleware`
- [ ] ⬜ **2.2.2** — Aplicar `app.use(authMiddleware)` ANTES dos routers (exceto `/health` e `/`)
- [ ] ⬜ **2.2.3** — Testar: fazer `curl` sem token → deve retornar 401
- [ ] ⬜ **2.2.4** — Testar: fazer `curl` com token válido → deve retornar 200

#### 2.3 — Remover/sanitizar endpoint de login local
- [ ] ⬜ **2.3.1** — Em `backend/src/modules/usersSystem/`, remover ou desativar a rota `POST /login`
- [ ] ⬜ **2.3.2** — Garantir que o controller `login()` já não é exposto (será substituído pelo SSO)

#### 2.4 — Preparar os controllers para receber `tenantId`
- [ ] ⬜ **2.4.1** — Em cada controller/dataAccess, substituir queries hardcoded por queries com `tenantId`:
  ```js
  // Antes:
  Model.find({})
  // Depois:
  Model.find({ tenantId: req.user.tenantId })
  ```
- [ ] ⬜ **2.4.2** — Em operações de criação (`POST`/`PUT`), injetar automaticamente:
  ```js
  newDoc.tenantId = req.user.tenantId;
  ```

---

### 🔷 ETAPA 3 — Refatoração do AuthContext (Frontend)

#### 3.1 — Trocar sessionStorage por localStorage + token
- [ ] ⬜ **3.1.1** — Em `frontend/src/features/login/authContext.jsx`:
  - Substituir TODAS as ocorrências de `sessionStorage` por `localStorage`
  - A chave `"auth"` passa a armazenar `{ token, user }` em vez do objeto user bruto
- [ ] ⬜ **3.1.2** — Atualizar `login()` para receber e armazenar o token JWT:
  ```js
  function login(token, userData) {
    localStorage.setItem("auth", JSON.stringify({ token, user: userData }));
    setUser(userData);
    setToken(token);
  }
  ```
- [ ] ⬜ **3.1.3** — Atualizar `logout()` para limpar token também
- [ ] ⬜ **3.1.4** — Adicionar estado `token` ao contexto (para componentes que precisem dele)

#### 3.2 — Lógica de extração de token no arranque (SSO pista de pouso)
- [ ] ⬜ **3.2.1** — No `useEffect` de inicialização do `AuthProvider`:
  1. Verificar se há `?token=` na URL (cenário de redirect)
  2. Se houver: extrair, guardar em localStorage, limpar query param da URL
  3. Se não houver: restaurar de localStorage e verificar expiração
- [ ] ⬜ **3.2.2** — Implementar verificação de expiração: decodificar payload e comparar `exp` com `Date.now()`
- [ ] ⬜ **3.2.3** — Se token expirado, limpar localStorage e forçar novo login

#### 3.3 — Criar helper `apiFetch` com injeção automática de token
- [ ] ⬜ **3.3.1** — Criar `frontend/src/utils/api.js`
- [ ] ⬜ **3.3.2** — Implementar função `apiFetch(path, options)`:
  - Lê token do localStorage
  - Injeta `Authorization: Bearer <token>` em todos os pedidos
  - Em caso de 401: limpa auth e redireciona para login
  - Em caso de 403: mostra mensagem de acesso negado
- [ ] ⬜ **3.3.3** — Exportar também a URL base da API do Project-NGO

---

### 🔷 ETAPA 4 — Página de Login e ProtectedRoute (Integração com Squamata)

> Com a ETAPA 0 concluída, o Squamata frontend já sabe redirecionar de volta.
> Agora o Project-NGO precisa de: (a) enviar o utilizador para o Squamata e (b) recebê-lo de volta.

#### 4.1 — ProtectedRoute: redirecionar para o Squamata-Login
- [ ] ⬜ **4.1.1** — Em `ProtectedRoute.jsx`, importar `useAuth` e configurar o redirect:
  ```jsx
  export default function ProtectedRoute() {
    const { user, token } = useAuth();

    if (!user || !token) {
      const squamataUrl = import.meta.env.VITE_SQUAMATA_FRONTEND_URL || 'http://localhost:5174';
      const returnUrl = window.location.href;
      const ssoUrl = `${squamataUrl}/login?appSlug=project-ngo&tenantId=default&returnUrl=${encodeURIComponent(returnUrl)}`;
      window.location.href = ssoUrl;
      return null;
    }

    return <Outlet />;
  }
  ```
- [ ] ⬜ **4.1.2** — Adicionar `VITE_SQUAMATA_FRONTEND_URL` ao `.env` do frontend

#### 4.2 — Pista de Pouso: extrair token da URL quando Squamata redireciona de volta
- [ ] ⬜ **4.2.1** — Isto já está coberto pelo item **3.2.1** do AuthContext (extrair `?token=` da URL no `useEffect` inicial). Confirmar que funciona com o hash router:
  - O Squamata redireciona para `http://localhost:3011?token=...`
  - O hash router transforma isto em `http://localhost:3011/?token=...#/`
  - O `window.location.search` ainda contém `?token=...` → funciona ✅
- [ ] ⬜ **4.2.2** — Testar o fluxo completo: aceder a uma rota protegida → ser redirecionado para o Squamata → fazer login → ser redirecionado de volta → ver a página protegida

#### 4.3 — (Opcional) Manter página de login local como fallback
- [ ] ⬜ **4.3.1** — A rota `/Login` pode ser mantida no router, mas agora redireciona para o Squamata em vez de mostrar formulário próprio
- [ ] ⬜ **4.3.2** — Ou remover completamente a rota `/Login` já que o ProtectedRoute trata do redirect

---

### 🔷 ETAPA 5 — Refatoração de TODOS os Serviços Frontend

#### 5.1 — Substituir fetch() direto por apiFetch() em todos os serviços
- [ ] ⬜ **5.1.1** — `services/activitiesServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.2** — `services/fieldsServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.3** — `services/usersServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.4** — `services/usersSystemServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.5** — `services/pagesServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.6** — `services/menusServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.7** — `services/exampleServices.jsx` → usar `apiFetch`
- [ ] ⬜ **5.1.8** — Quaisquer outros ficheiros em `services/` → usar `apiFetch`

#### 5.2 — Corrigir botão "Sair do Sistema" no Header
- [ ] ⬜ **5.2.1** — Em `components/header.jsx`, importar `useAuth` do contexto
- [ ] ⬜ **5.2.2** — Substituir `console.log("Sair do Sistema")` por `logout()` do contexto
- [ ] ⬜ **5.2.3** — Após logout, redirecionar para `/Login`

---

### 🔷 ETAPA 6 — Multi-Tenancy: Adicionar `tenantId` nos Dados

#### 6.1 — Adicionar campo tenantId nos modelos Mongoose
- [ ] ⬜ **6.1.1** — `models/User.js` → adicionar `tenantId: { type: String, default: "default", index: true }`
- [ ] ⬜ **6.1.2** — `models/Activity.js` → idem
- [ ] ⬜ **6.1.3** — `models/Field.js` → idem
- [ ] ⬜ **6.1.4** — `models/Page.js` → idem
- [ ] ⬜ **6.1.5** — `models/Menu.js` → idem

#### 6.2 — Script de migração para documentos existentes
- [ ] ⬜ **6.2.1** — Criar `backend/src/scripts/addTenantId.js`
- [ ] ⬜ **6.2.2** — Script percorre todas as coleções e adiciona `tenantId: "default"` onde o campo não existe
- [ ] ⬜ **6.2.3** — Executar o script uma vez no ambiente de produção

#### 6.3 — Aplicar filtro tenantId em todas as queries
- [ ] ⬜ **6.3.1** — `modules/users/` — filtrar por `tenantId` em GET, PUT, DELETE
- [ ] ⬜ **6.3.2** — `modules/activities/` — idem
- [ ] ⬜ **6.3.3** — `modules/fields/` — idem
- [ ] ⬜ **6.3.4** — `modules/pages/` — idem
- [ ] ⬜ **6.3.5** — `modules/menus/` — idem
- [ ] ⬜ **6.3.6** — `modules/usersSystem/` — idem (se aplicável)

#### 6.4 — Injetar tenantId automático em operações de escrita
- [ ] ⬜ **6.4.1** — Todos os controllers de criação (`POST`) devem buscar `tenantId` de `req.user.tenantId`
- [ ] ⬜ **6.4.2** — Todos os controllers de atualização (`PUT`) devem validar que o documento pertence ao mesmo `tenantId`

---

### 🔷 ETAPA 7 — Testes e Validação Final

#### 7.1 — Testes manuais de fluxo completo
- [ ] ⬜ **7.1.1** — Aceder ao Project-NGO sem token → deve mostrar página de login
- [ ] ⬜ **7.1.2** — Fazer login com credenciais válidas do Squamata → deve entrar no sistema
- [ ] ⬜ **7.1.3** — Fazer login com credenciais inválidas → deve mostrar erro
- [ ] ⬜ **7.1.4** — Fazer refresh da página (F5) → deve manter a sessão (teste do localStorage)
- [ ] ⬜ **7.1.5** — Clicar "Sair do Sistema" → deve voltar à página de login
- [ ] ⬜ **7.1.6** — Aceder diretamente a uma URL protegida sem token → deve redirecionar para login
- [ ] ⬜ **7.1.7** — Fazer pedido à API sem token → deve retornar 401
- [ ] ⬜ **7.1.8** — Fazer pedido à API com token expirado → deve retornar 401
- [ ] ⬜ **7.1.9** — Criar um registo (User, Activity, etc.) → deve ter `tenantId: "default"`
- [ ] ⬜ **7.1.10** — Listar registos → deve devolver apenas os do `tenantId` do token

#### 7.2 — Verificações de segurança
- [ ] ⬜ **7.2.1** — Confirmar que o hash da password NÃO é enviado em nenhuma resposta da API
- [ ] ⬜ **7.2.2** — Confirmar que o token NÃO aparece em logs ou console
- [ ] ⬜ **7.2.3** — Confirmar que `tenantId` do token não pode ser sobrescrito pelo body do request

#### 7.3 — Verificações de compatibilidade Docker
- [ ] ⬜ **7.3.1** — `docker compose up --build` sobe sem erros
- [ ] ⬜ **7.3.2** — Healthcheck do backend passa
- [ ] ⬜ **7.3.3** — Frontend consegue comunicar com backend via rede `squamata-global`
- [ ] ⬜ **7.3.4** — Backend consegue comunicar com Squamata-Login via rede `squamata-global`

---

## 4. Resumo de Entregáveis por Prioridade

| Prioridade | Etapas | Esforço | Descrição |
|------------|--------|---------|-----------|
| 🔴 **P0** | **Etapa 0** | 30min | Ajustes mínimos no Squamata-Login (3 mudanças no `Login.jsx`) |
| 🔴 **P0** | Etapa 1 + 2 | 3-4h | Middleware JWT no backend + healthcheck — **bloqueia o acesso não autenticado** |
| 🔴 **P0** | Etapa 3 | 2-3h | Refatorar AuthContext: localStorage + token flow + pista de pouso |
| 🔴 **P0** | Etapa 4 | 30min | ProtectedRoute com redirect para Squamata + pista de pouso |
| 🟡 **P1** | Etapa 5 | 2-3h | Refatorar TODOS os serviços frontend com `apiFetch` |
| 🟡 **P1** | Etapa 6 | 2-3h | Adicionar `tenantId` nos modelos e queries |
| 🟢 **P2** | Etapa 7 | 1-2h | Testes manuais e validação final |

---

## 5. Pontos de Atenção

1. **`JWT_SECRET` deve ser IDÊNTICO** entre Squamata-Login e Project-NGO. Ambos usam `super_secret_jwt_key_calango_inc` como fallback default.

2. **O `appSlug` no token PRECISA ser `"project-ngo"`**. O middleware rejeitará tokens de outras apps. O frontend deve sempre enviar `appSlug: "project-ngo"` no body do login para o Squamata.

3. **CORS do Squamata está aberto** (`cors()` sem opções = permite todas as origens), portanto o frontend do Project-NGO pode chamar a API do Squamata diretamente.

4. **Hash router (`createHashRouter`) não interfere** com query params (`?token=...`), portanto o fluxo de extração de token da URL funciona sem problemas.

5. **O Squamata-Login terá alterações mínimas** — apenas 3 mudanças no `Login.jsx` (frontend) para suportar `returnUrl` genérico. Zero alterações no backend. Ver ETAPA 0.

6. **`tenantId` inicial é `"default"`**. Futuramente permite expansão multi-unidade (ex: `"ong-sp"`, `"ong-rj"`).

7. **Modelo `UserSystem` atual pode ser depreciado** — o Squamata passa a ser a fonte de verdade para credenciais. As contas existentes no `UserSystem` devem eventualmente ser migradas para o Squamata-Login (fora do escopo desta fase).


