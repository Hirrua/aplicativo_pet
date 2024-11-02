import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateNewColumnVacina1730567406529 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("vacinas", 
      new TableColumn({
        name: "fabricante",
        type: "varchar",
        length: "255",
        isNullable: false
      })
    )

    await queryRunner.dropColumn("vacinas", "fabricante_id")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("vacinas", "fabricante")

    await queryRunner.addColumn(
      "vacinas",
      new TableColumn({
        name: "fabricante_id",
        type: "int",
        isNullable: true,
      })
    );
  }

}