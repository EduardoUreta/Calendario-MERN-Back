import express from "express";
import dotenv from "dotenv";
import { eventsRoutes, usersRoutes } from "./routes/index.js";
import { dbConnection } from "./database/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Conexión BD Mongo
dbConnection();

// Acceso a carpeta pública
app.use(express.static("public"));
// Lectura y parseo de JSON
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({
  origin: 'https://www.eduardoureta.xyz/',
  credentials: true, 
}));

app.use("/api/auth", usersRoutes);
app.use("/api/events", eventsRoutes);

app.use("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(),"public/index.html"));
});

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});