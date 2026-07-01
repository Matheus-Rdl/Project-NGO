# Project NGO - Sistema de Gestão para ONGs

Um sistema completo de gestão (ERP) desenvolvido sob medida para Organizações Não Governamentais (ONGs). Este projeto visa facilitar e centralizar o cadastro de usuários, voluntários e assistidos, além de gerenciar tarefas, atividades e eventos de forma ágil e moderna.

## 🚀 Funcionalidades

* **Gestão de Pessoas:** Cadastro detalhado de usuários do sistema, voluntários e assistidos.
* **Controle de Atividades e Eventos:** Criação, gerenciamento e acompanhamento de atividades promovidas pela ONG.
* **Controle de Presença e Relatórios:** Registro de presença nas atividades com exportação automática de relatórios em **PDF** e **Excel**.
* **Gestão Dinâmica do Sistema:** Modelos flexíveis para customização de Campos, Menus e Páginas dinâmicas adaptáveis à necessidade da ONG.
* **Autenticação e Segurança:** Controle de acesso estruturado para usuários do sistema (`UserSystem`).

## 🛠️ Tecnologias Utilizadas

O projeto adota um padrão de arquitetura moderna baseada em Javascript, separando a aplicação em dois ecossistemas principais:

### Frontend
* **[React](https://reactjs.org/)** (configurado via **[Vite](https://vitejs.dev/)**) - Para uma interface de usuário extremamente rápida e reativa.
* **CSS Modules** - Estilização componentizada (`.module.css`), garantindo ausência de conflitos visuais.
* Estrutura baseada em *Features* e *Components* para maior escalabilidade de código.

### Backend
* **[Node.js](https://nodejs.org/)** - Construção de uma API RESTful eficiente.
* **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL (acesso via `mongo.js` / Mongoose), ideal para a flexibilidade de dados exigida pelo terceiro setor.
* Arquitetura modular dividida em *Controllers*, *DataAccess* e *Routers* (ex: `activitiesControllers.js`, `usersDataAccess.js`).

### Infraestrutura
* **[Docker](https://www.docker.com/) & Docker Compose** - A aplicação está 100% conteinerizada, garantindo que o ambiente de desenvolvimento seja idêntico ao de produção e facilitando o deploy em qualquer servidor.


## ⚙️ Como Executar o Projeto

### Pré-requisitos
* **Git**

* **Docker e Docker Compose instalados (Recomendado para subir tudo de uma vez).**

* **(Opcional) Node.js caso queira rodar localmente sem os containers.**

### Opção 1: Rodando via Docker (Recomendado)
* **Esta é a forma mais rápida de iniciar o desenvolvimento, pois o docker-compose cuidará do Frontend, Backend e da instância do MongoDB simultaneamente.**

* **Clone o repositório e acesse a pasta do projeto:**

```
Bash
git clone <url-do-repositorio>
cd Project-NGO-frontend-refactor
Suba os containers em background:
``` 

```
Bash
docker-compose up -d --build
```

### Acesse a aplicação:

* **Frontend: Geralmente em http://localhost:5173 (ou a porta exposta pelo Vite no compose)**

* **Backend: A API estará rodando na porta mapeada (ex: http://localhost:3000)**

### Opção 2: Rodando Localmente (Sem Docker)
* **Se preferir rodar os serviços separadamente no seu terminal:**

### 1. Iniciando o Backend:

```
Bash
cd backend
npm install
# Certifique-se de configurar suas variáveis de ambiente e conexão com o MongoDB
npm start # ou npm run dev
```

2. Iniciando o Frontend:
```
Bash
cd frontend
npm install
npm run dev
```

## 🤝 Como Contribuir
* **Faça um fork do projeto.**

* **Crie uma nova branch com a sua feature: git checkout -b minha-nova-feature.**

* **Salve suas alterações e crie um commit relatando o que você fez: git commit -m 'feat: Adiciona nova funcionalidade X'.**

* **Envie o seu código para o repositório original: git push origin minha-nova-feature.**

* **Abra um Pull Request para avaliação.**

## 📝 Licença

### Este projeto está sob a licença MIT.