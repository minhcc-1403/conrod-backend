import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePayment1741688285687 implements MigrationInterface {
    name = 'CreatePayment1741688285687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "orderId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_d09d285fe1645cd2f0db811e29" UNIQUE ("orderId"),
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum" AS ENUM(
                'AWAITING_PAYMENT',
                'AWAITING_SHIPMENT',
                'SHIPPED',
                'IN_TRANSIT',
                'COMPLETED',
                'CANCELED'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "status" "public"."order_status_enum" NOT NULL DEFAULT 'AWAITING_PAYMENT',
                "customerId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
    }

}
