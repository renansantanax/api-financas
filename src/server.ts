import dotenv from "dotenv";
import app from "./app";
import { AppDataSourse } from "./infrastructure/database/data-source";

dotenv.config();

const port = process.env.PORT || 3000;

AppDataSourse.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar no banco de dados", error);
  });
