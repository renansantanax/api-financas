import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contas")
export class Conta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150 })
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor!: number;

  @Column({ type: "enum", enum: ["PAGAR", "RECEBER"] })
  tipo!: "PAGAR" | "RECEBER";

  @Column({ type: "date" })
  dataVencimento!: string;

  @Column({ type: "boolean", default: false })
  pago!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;

  @CreateDateColumn()
  atualizadoEm!: Date;
}
