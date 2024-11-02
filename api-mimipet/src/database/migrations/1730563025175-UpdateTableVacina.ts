import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableVacina1730563025175 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE vacinas DROP COLUMN lote`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE vacinas ADD COLUMN lote varchar(255) NOT NULL`)
  }

}
