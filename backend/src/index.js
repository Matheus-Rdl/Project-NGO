import express from "express"; // Import the Express framework
import cors from "cors"; // Import CORS to allow cross-origin requests
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv"; // Import dotenv to load environment variables
import { Mongo } from "./database/mongo.js"; // Import custom MongoDB connection module
import usersRouter from "./modules/users/usersRouter.js";
import fieldsRouter from "./modules/fields/fieldsRouter.js";
import activitiesRouter from "./modules/activities/activitiesRouter.js";
import usersSystemRouter from "./modules/usersSystem/usersSystemRouter.js";
import pagesRouter from "./modules/pages/pagesRouter.js";
import menusRouter from "./modules/menus/menusRouter.js";

// Em ES Modules, precisamos recriar as variáveis __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dizemos ao dotenv para subir duas pastas e procurar o .env na raiz do projeto
config({ path: path.resolve(__dirname, '../../.env') });

// Main function to start the server
async function main() {
  // Puxa a porta do .env ou usa a 3000 como segurança (fallback)
  const port = process.env.API_PORT || 3000;
  // No Docker, o host deve ser '0.0.0.0' para aceitar conexões externas
  const hostname = "0.0.0.0";

  const app = express(); // Create an instance of the Express application

  //console.log("MONGO_CS:", process.env.MONGO_CS);
  //console.log("MONGO_DB_NAME:", process.env.MONGO_DB_NAME);

  console.log("MONGO_CS:", process.env.MONGO_CS);
  console.log("MONGO_DB_NAME:", process.env.MONGO_DB_NAME);

  // Connect to MongoDB using custom module
  const mongoConnection = await Mongo.connect({
    mongoConnectionString: process.env.MONGO_CS,
    mongoDbName: process.env.MONGO_DB_NAME,
  });

  // Print the connection result (success message or error)
  console.log(mongoConnection);

  // Middleware to allow requests from other origins
  app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://matheus-rdl.github.io",
      "https://develop-ngo.vercel.app",
      "https://production-ngo.vercel.app",
      "http://100.111.240.89:3011",          // Para quando você testar acessando pelo IP local no Optiplex
      "http://localhost:3011",               // Para quando você testar acessando pelo IP local no Optiplex
      "https://ong.calangoapp.com.br",       // A nova URL oficial de Produção
      "https://ong-teste.calangoapp.com.br"  // (Opcional) Se você for criar um túnel para o ambiente de testes depois
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));

  // Middleware to parse JSON bodies in requests
  app.use(express.json());

  // Root route - responds with a welcome message
  app.get("/", (req, res) => {
    res.send({
      success: true,
      statusCode: 200,
      body: "Welcome to NGO-Project - TESTE",
    });
  });

  // Routes
  app.use("/users", usersRouter);
  app.use("/fields", fieldsRouter);
  app.use("/activities", activitiesRouter);
  app.use("/users-system", usersSystemRouter);
  app.use("/pages", pagesRouter);
  app.use("/menus", menusRouter);

  // Start the server and listen on the defined port
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port: ${port}`);
  });
}

main(); // Run the main function
