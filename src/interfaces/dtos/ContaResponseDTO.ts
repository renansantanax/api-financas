/*
    DTO para representar os dados que serão
    retornados na consulta de contas
*/
export interface ContaResponseDTO {
    id: number; //Id da conta
    nome: string; //Nome da conta
    descricao?: string; //Descrição da conta
    valor: number; //Valor da conta
    tipo: "PAGAR" | "RECEBER"; //Tipo da conta
    dataVencimento: string; //Data de vencimento da conta
    pago?: boolean; //Pago?
    categoria: { //Composição
        id: number; //Id da categoria
        nome: string; //Nome da categoria
    }
}