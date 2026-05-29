/*
    DTO para representar os dados que serão
    retornados ao consulta de contas
*/
export interface ContaResponseDTO {
  id: number;
  nome: string;
  descricao?: string;
  valor: number;
  tipo: "PAGAR" | "RECEBER";
  dataVencimento: string;
  pago?: boolean;
  categoria: {
    id: number;
    nome: string;
  };
}
