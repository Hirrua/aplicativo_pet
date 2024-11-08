import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column('int', { nullable: false })
  vacina_id: number

  @Column('int', { nullable: false })
  animal_id: number

  @ManyToOne(() => Animal, (animal) => animal.aplicacoesVacinas, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'animal_id' })
  animal: Animal

  @ManyToOne(() => Vacina, (vacina) => vacina.aplicacoesVacinas, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'vacina_id' })
  vacina: Vacina
}

export default AplicacaoVacina
