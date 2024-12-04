import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Tutor from "./tutor";
import Vacina from "./vacinas";
import AplicacaoVacina from "./aplicacao";

@Entity("animais")
class Animal {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column('varchar', { nullable: false, length: 50 })
  nome: string

  @Column('char', { nullable: false, length: 1 })
  sexo: string

  @Column('varchar', { nullable: false, length: 100 })
  especie: string

  @Column('varchar', { nullable: false, length: 50 })
  cor: string

  @Column('varchar', { nullable: false, length: 50 })
  raca: string

  @Column('boolean', { default: false })
  memorial: boolean

  @CreateDateColumn()
  criado_em: Date

  @CreateDateColumn()
  atualizado_em: Date

  @Column('varchar', { nullable: true })
  foto_animal: string

  @Column('int', { nullable: false })
  id_tutor: number

  @ManyToOne(() => Tutor, (tutores) => tutores.animais)
  @JoinColumn({ name: "id_tutor" })
  tutores: Tutor

  @OneToMany(() => AplicacaoVacina, (aplicacaoVacina) => aplicacaoVacina.animal)
  aplicacoesVacinas: AplicacaoVacina[]
}

export default Animal