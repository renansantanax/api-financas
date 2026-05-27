import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Categoria } from "./Categoria";

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

    @UpdateDateColumn()
    atualizadoEm!: Date;

    @ManyToOne(() => Categoria, categoria => categoria.contas)
    @JoinColumn({ name: 'categoriaId' }) //Foreign key
    categoria!: Categoria;
}