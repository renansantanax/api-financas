import { Request, Response } from "express";
import { CategoriaService } from "../../domain/services/CategoriaService";

export class CategoriaController {

    //Função para consultar todas as categorias
    async consultarTodos(req: Request, res: Response) : Promise<Response> {
        try {

            //Criar uma instância do serviço de categoria
            const service = new CategoriaService();

            //Chamar o método de consulta de todas as categorias
            const categorias = await service.consultarTodos();

            //HTTP 200 - OK
            return res.status(200).json(categorias);
        }
        catch(error: any) {
            //HTTP 500 - Erro Interno do Servidor
            return res.status(500).json({
                message: error.message,
            })
        }
    }
}