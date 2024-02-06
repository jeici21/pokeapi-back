import express from "express";
import 'dotenv/config'
import cors from "cors"
import Pool from "pg-pool";
import { createTypeTable } from "./models/Type";
import { createPokemonTable } from "./models/Pokemon";
import { getAllPokemonController } from "./controllers/getAllPokemonController";
import swaggerConfig from './swagger-config';

const app = express()
const PORT = Number(process.env.PORT) || 5000
export const pool = new Pool({ connectionString: process.env.DB_URL });

app.use(cors({ origin: "*" }));
app.use(express.json());
swaggerConfig(app);

app.get("/", getAllPokemonController)

pool.connect().then(async () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  app.listen(PORT, '0.0.0.0');
  await createTypeTable()
  await createPokemonTable();
});