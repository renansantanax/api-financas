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
      where: { id: dto.categoriaId },
    });

    if (!categoria) {
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
      categoria: categoria, //relacionamento com a categoria
    });

    //Salvar a conta no banco
    const contaSalva = await this.contaRepository.save(conta);

    //Retornar a conta salva como DTO de resposta
    return this.mapearParaResponseDTO(contaSalva);
  }

  /*
      Método para listar todas as contas
   */
  async consultarTodos(): Promise<ContaResponseDTO[]> {
    //Buscar todas as contas com suas categorias
    //Ordenando por data de vencimento
    const contas = await this.contaRepository.find({
      relations: {
        categoria: true, //Incluir a categoria relacionada
      },
      order: {
        dataVencimento: "ASC", //Ordenar por data de vencimento crescente
      },
    });

    //Mapear as contas para DTOs de resposta
    return contas.map((conta) => this.mapearParaResponseDTO(conta));
  }

  /*
      Método para consultar uma conta por ID      
   */
  async consultarPorId(id: number): Promise<ContaResponseDTO> {
    //Buscar a conta pelo ID, incluindo a categoria relacionada
    const conta = await this.contaRepository.findOne({
      where: { id }, //Buscar por ID
      relations: {
        categoria: true, //Incluir a categoria relacionada
      },
    });

    if (!conta) {
      //Se a conta não for encontrada, lançar um erro
      throw new Error("Conta não encontrada.");
    }

    //Retornar a conta encontrada como DTO de resposta
    return this.mapearParaResponseDTO(conta);
  }

  /*
      Método para atualizar uma conta existente
   */
  async atualizar(id: number, dto: ContaRequestDTO): Promise<ContaResponseDTO> {
    //Buscar a conta existente
    const conta = await this.contaRepository.findOne({
      where: { id }, //Buscar por ID
      relations: {
        categoria: true, //Incluir a categoria relacionada
      },
    });

    //Se a conta não for encontrada, lançar um erro
    if (!conta) {
      throw new Error("Conta não encontrada.");
    }

    //Buscar a categoria
    const categoria = await this.categoriaRepository.findOne({
      where: { id: dto.categoriaId },
    });

    //Se a categoria não for encontrada, lançar um erro
    if (!categoria) {
      throw new Error("Categoria não encontrada.");
    }

    //Atualizar os campos da conta
    conta.nome = dto.nome;
    conta.descricao = dto.descricao;
    conta.valor = dto.valor;
    conta.tipo = dto.tipo;
    conta.dataVencimento = dto.dataVencimento;
    conta.pago = dto.pago || false;
    conta.categoria = categoria; //Atualizar a categoria relacionada

    //Salvar as alterações no banco
    const contaAtualizada = await this.contaRepository.save(conta);

    //Retornar a conta atualizada como DTO de resposta
    return this.mapearParaResponseDTO(contaAtualizada);
  }

  /*
        Método para excluir uma conta por ID
   */
  async excluir(id: number): Promise<void> {
    //Buscar a conta existente
    const conta = await this.contaRepository.findOne({
      where: { id }, //Buscar por ID
    });

    //Se a conta não for encontrada, lançar um erro
    if (!conta) {
      throw new Error("Conta não encontrada.");
    }

    //Excluir a conta do banco
    await this.contaRepository.remove(conta);
  }

  /*
      Método para converter Conta em ContaResponseDTO
   */
  private mapearParaResponseDTO(conta: Conta): ContaResponseDTO {
    //Retornar a conta salva como DTO de resposta
    return {
      id: conta.id,
      nome: conta.nome,
      descricao: conta.descricao,
      valor: conta.valor,
      tipo: conta.tipo,
      dataVencimento: conta.dataVencimento,
      pago: conta.pago,
      categoria: {
        id: conta.categoria.id,
        nome: conta.categoria.nome,
      },
    };
  }
}
