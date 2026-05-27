import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Conta } from "../../domain/entities/Conta";
import { Categoria } from "../../domain/entities/Categoria";

dotenv.config();

//Função para retornar a conexão com o banco de dados
export const AppDataSource = new DataSource({
    type : "mysql",
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT),
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    synchronize : true,
    logging : true,
    entities: [
        Conta,
        Categoria
    ]
});