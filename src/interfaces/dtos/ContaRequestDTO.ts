/*
    DTO para representar os dados que serão
    recebidos no cadastro ou edição de conta
*/
export interface ContaRequestDTO {
    nome: string; //Nome da conta
    descricao?: string; //Descrição da conta
    valor: number; //Valor da conta
    tipo: "PAGAR" | "RECEBER"; //Tipo da conta
    dataVencimento: string; //Data de vencimento da conta
    pago?: boolean; //Pago?
    categoriaId: number; //Id da categoria (chave estrangeira)
}