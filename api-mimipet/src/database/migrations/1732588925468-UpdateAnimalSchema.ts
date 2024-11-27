import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAnimalSchema1732588925468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("animais",
            new TableColumn({
                name: "foto_animal",
                type: "varchar",
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("animais", "foto_animal")
    }

}
