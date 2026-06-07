import { AppDataSource } from "../../infrastructure/database/data-source";
import { CategoriaResponseDTO } from "../../interfaces/dtos/CategoriaResponseDTO";
import { Categoria } from "../entities/Categoria";

export class CategoriaService {

    //Declarando um repositório criado pelo TypeORM para categoria
    private categoriaRepository = AppDataSource.getRepository(Categoria);

    //Método para consultar as categorias cadastradas no banco de dados
    async consultarTodos(): Promise<CategoriaResponseDTO[]> {

        //Consultar todas as categorias cadastradas em ordem alfabética
        const categorias = await this.categoriaRepository.find({
            order: {
                nome: "ASC"
            }
        });

        //Copiar os dados das categorias (Categoria[]) para 
        //uma lista do DTO (CategoriaResponseDTO[])
        const resultado: CategoriaResponseDTO[] = categorias.map(categoria => {
            return {
                id: categoria.id,
                nome: categoria.nome
            }
        });

        return resultado;
    }
}