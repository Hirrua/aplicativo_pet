import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Animal from "./animal";

@Entity("tutores")
class Tutor {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column('varchar', { nullable: false, length: 50 })
  nome: string

  @Column('varchar', { nullable: true, length: 100})
  sobrenome: string

  @Column('varchar', { nullable: false, length: 50, unique: true })
  email: string

  @Column('varchar', { nullable: false, length: 255 })
  senha: string

  @Column('varchar', { nullable: true, length: 11 })
  celular: string

  @Column('varchar', { nullable: false, length: 14 })
  cpf: string

  @CreateDateColumn()
  criado_em: Date

  @OneToMany(() => Animal, (animais) => animais.tutores)
  animais: Animal[]
}

export default Tutor