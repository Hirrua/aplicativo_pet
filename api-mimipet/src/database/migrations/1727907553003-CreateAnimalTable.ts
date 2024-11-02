import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAnimalTable1727907553003 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animais",
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
            length: "100",
            isNullable: false
          },
          {
            name: "sexo",
            type: "char",
            length: "1",
            isNullable: false
          },
          {
            name: "especie",
            type: "varchar",
            length: "100",
            isNullable: false
          },
          {
            name: "cor",
            type: "varchar",
            length: "50",
            isNullable: true
          },
          {
            name: "raca",
            type: "varchar",
            length: "50",
            isNullable: true
          },
          {
            name: "memorial",
            type: "boolean",
            default: false
          },
          {
            name: "id_tutor",
            type: "int",
            isNullable: false
          },
          {
            name: "criado_em",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "atualizado_em",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
    await queryRunner.createForeignKey(
      "animais", new TableForeignKey({
        columnNames: ["id_tutor"],
        referencedColumnNames: ["id"],
        referencedTableName: "tutores",
        onDelete: "CASCADE"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animais")
  }

}
