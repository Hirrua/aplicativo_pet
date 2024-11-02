import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Vacina from "./vacinas";

@Entity("estoques")
class Estoque {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("varchar", { length: 255, nullable: false })
  lote: string

  @Column("varchar", { length: 255, nullable: false })
  codigo: string

  @Column("int", { nullable: false })
  quantidade: number

  @CreateDateColumn()
  vencimento_em: Date

  @Column("varchar", { length: 50, nullable: true })
  status: string

  @CreateDateColumn()
  inserido_em: Date

  @Column("varchar", { length: 50, nullable: true })
  unidade_medida: string

  @ManyToOne(() => Vacina, (vacina) => vacina.estoques, { onDelete: "CASCADE" })
  vacina: Vacina
}

export default Estoque
