import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Animal from "./animal";
import Estoque from "./estoque";
import AplicacaoVacina from "./aplicacao";

@Entity("vacinas")
class Vacina {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("varchar", { length: 255, nullable: false })
  nome: string

  @Column("varchar", { length: 255, nullable: false })
  fabricante: string

  @Column("text", { nullable: true })
  anotacoes: string

  @Column("int", { nullable: false })
  intervalo: number

  @Column("int", { nullable: false })
  doses: number

  @OneToMany(() => Estoque, (estoque) => estoque.vacina)
  estoques: Estoque[]

  @OneToMany(() => AplicacaoVacina, (aplicacaoVacina) => aplicacaoVacina.vacina, { onDelete: "CASCADE" })
  aplicacoesVacinas: AplicacaoVacina[]
}

export default Vacina
