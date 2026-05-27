import { Request, Response } from "express";
import { ContaRequestDTO } from "../../interfaces/dtos/ContaRequestDTO";
import { ContaService } from "../../domain/services/ContaService";

export class ContaController {

    async cadastrar(req: Request, res: Response) : Promise<Response> {
        try {
            
            //Copiar os dados da requisição para um objeto DTO
            const dto: ContaRequestDTO = req.body;

            //Criando uma instância do serviço de conta
            const service = new ContaService();

            //Chamar o método de cadastro de conta
            const resultado = await service.cadastrar(dto);

            //HTTP 201 - Criado
            return res.status(201).json({
                message: "Conta cadastrada com sucesso",
                conta: resultado
            });
        }
        catch(error: any) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}