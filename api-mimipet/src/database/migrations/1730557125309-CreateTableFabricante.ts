import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableFabricante1730389846491 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "fabricantes",
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
            length: "255",
            isNullable: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("fabricantes")
  }
}
