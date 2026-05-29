import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { CategoriaController } from "./application/controllers/CategoriaController";
import { ContaController } from "./application/controllers/ContaController";
import { swaggerSpec } from "./infrastructure/swagger/swaggerConfig";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const categoriaController = new CategoriaController(); // Instanciando o controlador de categoria
const contaController = new ContaController(); // Instanciando o controlador de conta

/**
 * @swagger
 * tags:
 *   - name: Categorias
 *     description: Endpoints para consulta de categorias
 *   - name: Contas
 *     description: Endpoints para gerenciamento de contas
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Consulta todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas.
 *     tags:
 *       - Categorias
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Categoria"
 *       500:
 *         description: Erro interno do servidor
 */
app.get("/api/categorias", (req, res) =>
  categoriaController.consultarTodos(req, res),
);

/**
 * @swagger
 * /api/contas:
 *   get:
 *     summary: Consulta todas as contas
 *     description: Retorna uma lista com todas as contas cadastradas.
 *     tags:
 *       - Contas
 *     responses:
 *       200:
 *         description: Lista de contas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ContaResponse"
 *       500:
 *         description: Erro interno do servidor
 */
app.get("/api/contas", (req, res) => contaController.consultarTodos(req, res));

/**
 * @swagger
 * /api/contas/{id}:
 *   get:
 *     summary: Consulta uma conta pelo ID
 *     description: Retorna os dados de uma conta específica através do seu ID.
 *     tags:
 *       - Contas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Conta encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContaResponse"
 *       500:
 *         description: Erro ao consultar a conta
 */
app.get("/api/contas/:id", (req, res) =>
  contaController.consultarPorId(req, res),
);

/**
 * @swagger
 * /api/contas:
 *   post:
 *     summary: Cadastra uma nova conta
 *     description: Cadastra uma nova conta no sistema.
 *     tags:
 *       - Contas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContaRequest"
 *           example:
 *             nome: "Conta de luz"
 *             descricao: "Conta referente ao mês atual"
 *             valor: 250.75
 *             tipo: "DESPESA"
 *             dataVencimento: "2026-05-30"
 *             pago: false
 *             categoriaId: 1
 *     responses:
 *       201:
 *         description: Conta cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Conta cadastrada com sucesso
 *                 conta:
 *                   $ref: "#/components/schemas/ContaResponse"
 *       500:
 *         description: Erro ao cadastrar conta
 */
app.post("/api/contas", (req, res) => contaController.cadastrar(req, res));

/**
 * @swagger
 * /api/contas/{id}:
 *   put:
 *     summary: Atualiza uma conta existente
 *     description: Atualiza os dados de uma conta já cadastrada.
 *     tags:
 *       - Contas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContaRequest"
 *           example:
 *             nome: "Conta de internet"
 *             descricao: "Conta de internet residencial"
 *             valor: 120.9
 *             tipo: "DESPESA"
 *             dataVencimento: "2026-06-10"
 *             pago: true
 *             categoriaId: 1
 *     responses:
 *       200:
 *         description: Conta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Conta atualizada com sucesso
 *                 conta:
 *                   $ref: "#/components/schemas/ContaResponse"
 *       500:
 *         description: Erro ao atualizar conta
 */
app.put("/api/contas/:id", (req, res) => contaController.atualizar(req, res));

/**
 * @swagger
 * /api/contas/{id}:
 *   delete:
 *     summary: Exclui uma conta pelo ID
 *     description: Remove uma conta cadastrada através do seu ID.
 *     tags:
 *       - Contas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Conta excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Conta excluída com sucesso
 *       500:
 *         description: Erro ao excluir conta
 */
app.delete("/api/contas/:id", (req, res) => contaController.excluir(req, res));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota inicial da API
 *     description: Verifica se a API está funcionando.
 *     tags:
 *       - Geral
 *     responses:
 *       200:
 *         description: API funcionando com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API Finanças funcionando com NodeJS, Express, TypeScript e TypeORM
 */
app.get("/", (req, res) => {
  return res.json({
    message:
      "API Finanças funcionando com NodeJS, Express, TypeScript e TypeORM",
  });
});

export default app;
