import { AppDataSource } from "../../infrastructure/database/data-source";
import { ContaRequestDTO } from "../../interfaces/dtos/ContaRequestDTO";
import { ContaResponseDTO } from "../../interfaces/dtos/ContaResponseDTO";
import { Categoria } from "../entities/Categoria";
import { Conta } from "../entities/Conta";

export class ContaService {

    private contaRepository = AppDataSource.getRepository(Conta);
    private categoriaRepository = AppDataSource.getRepository(Categoria);

    /*
        Método para criar uma nova conta
    */
   async cadastrar(dto: ContaRequestDTO): Promise<ContaResponseDTO> {

        //Verificar se a categoria existe
        const categoria = await this.categoriaRepository.findOne({
            where: { id: dto.categoriaId }
        });

        if(!categoria) {
            throw new Error("Categoria não encontrada.");
        }

        //Criar a conta
        const conta = this.contaRepository.create({
            nome: dto.nome,
            descricao: dto.descricao,
            valor: dto.valor,
            tipo: dto.tipo,
            dataVencimento: dto.dataVencimento,
            pago: dto.pago || false,
            categoria: categoria //relacionamento com a categoria
        });

        //Salvar a conta no banco
        const contaSalva = await this.contaRepository.save(conta);

        //Retornar a conta salva como DTO de resposta
        return {
            id: contaSalva.id,
            nome: contaSalva.nome,
            descricao: contaSalva.descricao,
            valor: contaSalva.valor,
            tipo: contaSalva.tipo,
            dataVencimento: contaSalva.dataVencimento,
            pago: contaSalva.pago,
            categoria: {
                id: categoria.id,
                nome: categoria.nome
            }
        };
   }
}