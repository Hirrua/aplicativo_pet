import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAplicacaoVacina1730389836490 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "aplicacoes_vacinas",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "data_aplicacao",
            type: "date",
            isNullable: false
          },
          {
            name: "animal_id",
            type: "int",
            isNullable: false
          },
          {
            name: "vacina_id",
            type: "int",
            isNullable: false
          },
          {
            name: "quantidade_aplicada",
            type: "int",
            isNullable: false
          },
          {
            name: "responsavel_aplicacao",
            type: "varchar",
            length: "255",
            isNullable: true
          }
        ]
      })
    )

    await queryRunner.createForeignKeys("aplicacoes_vacinas", [
      new TableForeignKey({
        columnNames: ["animal_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "animais",
        onDelete: "CASCADE"
      }),
      new TableForeignKey({
        columnNames: ["vacina_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vacinas",
        onDelete: "CASCADE"
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("aplicacoes_vacinas")
  }
}
