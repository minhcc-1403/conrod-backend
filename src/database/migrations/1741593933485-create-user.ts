import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1741593933485 implements MigrationInterface {
  name = 'CreateUser1741593933485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "birthDate" TIMESTAMP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "birthDate"
        `);
  }
}
