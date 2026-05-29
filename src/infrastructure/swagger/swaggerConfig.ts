import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Finanças",
      version: "1.0.0",
      description:
        "Documentação da API Finanças com NodeJS, Express, TypeScript e TypeORM",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            nome: {
              type: "string",
              example: "Alimentação",
            },
          },
        },
        ContaRequest: {
          type: "object",
          required: ["nome", "valor", "tipo", "dataVencimento", "categoriaId"],
          properties: {
            nome: {
              type: "string",
              example: "Conta de luz",
            },
            descricao: {
              type: "string",
              example: "Conta referente ao mês atual",
            },
            valor: {
              type: "number",
              example: 250.75,
            },
            tipo: {
              type: "string",
              example: "DESPESA",
            },
            dataVencimento: {
              type: "string",
              format: "date",
              example: "2026-05-30",
            },
            pago: {
              type: "boolean",
              example: false,
            },
            categoriaId: {
              type: "number",
              example: 1,
            },
          },
        },
        ContaResponse: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            nome: {
              type: "string",
              example: "Conta de luz",
            },
            descricao: {
              type: "string",
              example: "Conta referente ao mês atual",
            },
            valor: {
              type: "number",
              example: 250.75,
            },
            tipo: {
              type: "string",
              example: "DESPESA",
            },
            dataVencimento: {
              type: "string",
              format: "date",
              example: "2026-05-30",
            },
            pago: {
              type: "boolean",
              example: false,
            },
            categoria: {
              $ref: "#/components/schemas/Categoria",
            },
          },
        },
      },
    },
  },
  apis: ["./src/app.ts"],
});
