import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTutorTable1727797219467 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tutores",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "nome",
            type: "varchar",
            length: "50",
            isNullable: false
          },
          {
            name: "sobrenome",
            type: "varchar",
            length: "50",
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
            length: "50",
            isUnique: true,
            isNullable: false
          },
          {
            name: "senha",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "cpf",
            type: "varchar",
            length: "14",
            isNullable: false
          },
          {
            name: "celular",
            type: "varchar",
            length: "11",
            isNullable: true
          },
          {
            name: "criado_em",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tutores")
  }
}
