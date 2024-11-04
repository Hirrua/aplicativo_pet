import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column("int", { nullable: false })
  vacina_id: number

  @ManyToOne(() => Vacina, (vacina) => vacina.estoques, { onDelete: "CASCADE" })
  @JoinColumn({ name: "vacina_id" })
  vacina: Vacina
}

export default Estoque
