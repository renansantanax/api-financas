import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./infrastructure/database/data-source";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
        app.listen(PORT, () => {
            console.log("API rodando em http://localhost:" + PORT);
        })
    })
    .catch((error) => {
        console.log("Erro ao conectar no banco de dados", error);
    });