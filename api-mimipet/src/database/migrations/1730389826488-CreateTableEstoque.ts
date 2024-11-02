import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableEstoque1730389826488 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estoques",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "lote",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "nome",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "codigo",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "quantidade",
            type: "int",
            isNullable: false
          },
          {
            name: "vencimento_em",
            type: "date",
            isNullable: false
          },
          {
            name: "inserido_em",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "vacina_id",
            type: "int",
            isNullable: false
          },
          {
            name: "status",
            type: "varchar",
            length: "50",
            isNullable: true
          },
          {
            name: "unidade_medida",
            type: "varchar",
            length: "50",
            isNullable: true
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      "estoques",
      new TableForeignKey({
        columnNames: ["vacina_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vacinas",
        onDelete: "CASCADE"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estoques")
  }
}
