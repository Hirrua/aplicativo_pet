import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Vacina from "./vacinas";
import Animal from "./animal";

@Entity("aplicacoes_vacinas")
class AplicacaoVacina {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("date", { nullable: false })
  data_aplicacao: Date

  @Column("int", { nullable: false })
  quantidade_aplicada: number

  @Column("varchar", { length: 255, nullable: true })
  responsavel_aplicacao: string

  @ManyToOne(() => Animal, (animal) => animal.aplicacoesVacinas, { onDelete: "CASCADE" })
  animal: Animal

  @ManyToOne(() => Vacina, (vacina) => vacina.aplicacoesVacinas, { onDelete: "CASCADE" })
  vacina: Vacina
}

export default AplicacaoVacina
