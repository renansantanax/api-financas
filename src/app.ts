import express from "express";
import { CategoriaController } from "./application/controllers/CategoriaController";
import { ContaController } from "./application/controllers/ContaController";

const app = express();

app.use(express.json());

const categoriaController = new CategoriaController(); // Instanciando o controlador de categoria
const contaController = new ContaController(); // Instanciando o controlador de conta

// Rotas para categorias
app.get("/api/categorias", (req, res) => categoriaController.consultarTodos(req, res));

// Rotas para contas
app.post("/api/contas", (req, res) => contaController.cadastrar(req, res));

app.get("/", (req, res) => {
    return res.json({
        message : "API Finanças funcionando com NodeJS, Express, TypeScript e TypeORM"
    })
});

export default app;