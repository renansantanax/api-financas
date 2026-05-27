/*
    DTO para representar os dados que serão
    retornados ao consulta de contas
*/
export interface ContaResponseDTO {
  id: number; //Nome da conta
  nome: string;
  descricao?: string; //Descrição da conta
  valor: number; //Valor da conta
  tipo: "PAGAR" | "RECEBER"; //Tipo da conta
  dataVencimento: string; //Data de vencimento da conta
  pago?: boolean; //Pago?
  categoriaId: number; //Id da categoria (chave estrangeira)
}
