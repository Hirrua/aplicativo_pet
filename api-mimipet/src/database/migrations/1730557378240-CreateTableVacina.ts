import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableVacina1730389826489 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vacinas",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "fabricante_id",
            type: "int",
            isNullable: false
          },
          {
            name: "lote",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "anotacoes",
            type: "text",
            isNullable: true
          },
          {
            name: "doses",
            type: "int",
            isNullable: false
          },
          {
            name: "animal_id",
            type: "int",
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKeys("vacinas", [
      new TableForeignKey({
        columnNames: ["fabricante_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "fabricantes",
        onDelete: "CASCADE"
      }),
      new TableForeignKey({
        columnNames: ["animal_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "animais",
        onDelete: "CASCADE"
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vacinas")
  }
}
