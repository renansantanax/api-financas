import { Request, Response } from "express";
import { ContaRequestDTO } from "../../interfaces/dtos/ContaRequestDTO";
import { ContaService } from "../../domain/services/ContaService";

export class ContaController {
  async cadastrar(req: Request, res: Response): Promise<Response> {
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
        conta: resultado,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async consultarTodos(req: Request, res: Response): Promise<Response> {
    try {
      const service = new ContaService();
      const contas = await service.consultarTodos();
      return res.status(200).json(contas);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async consultarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const service = new ContaService();
      const conta = await service.consultarPorId(id);
      return res.status(200).json(conta);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async atualizar(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const dto: ContaRequestDTO = req.body;

      const service = new ContaService();

      const conta = await service.atualizar(id, dto);

      //HTTP 200 - OK
      return res.status(200).json({
        message: "Conta atualizada com sucesso",
        conta: conta,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async excluir(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const service = new ContaService();
      await service.excluir(id);

      //HTTP 200 - OK
      return res.status(200).json({
        message: "Conta excluída com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
