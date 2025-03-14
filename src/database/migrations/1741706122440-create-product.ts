import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1741706122440 implements MigrationInterface {
    name = 'CreateProduct1741706122440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"),
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "order_item" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "price" numeric(6, 2) NOT NULL,
                "orderId" integer NOT NULL,
                "productId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_21780d1c71891bffad87b9e4f94" PRIMARY KEY ("id", "orderId", "productId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "price" numeric(6, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product_to_category" (
                "productId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                CONSTRAINT "PK_ead833542a5bf513c93bc12b016" PRIMARY KEY ("productId", "categoryId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c4ec20a1cb494c9c3e34c8da10" ON "product_to_category" ("productId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_70eb26cea4105a27ce856dca20" ON "product_to_category" ("categoryId")
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "product_to_category"
            ADD CONSTRAINT "FK_c4ec20a1cb494c9c3e34c8da105" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "product_to_category"
            ADD CONSTRAINT "FK_70eb26cea4105a27ce856dca20d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product_to_category" DROP CONSTRAINT "FK_70eb26cea4105a27ce856dca20d"
        `);
        await queryRunner.query(`
            ALTER TABLE "product_to_category" DROP CONSTRAINT "FK_c4ec20a1cb494c9c3e34c8da105"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_70eb26cea4105a27ce856dca20"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c4ec20a1cb494c9c3e34c8da10"
        `);
        await queryRunner.query(`
            DROP TABLE "product_to_category"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP TABLE "order_item"
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
        await queryRunner.query(`
            DROP TABLE "category"
        `);
    }

}
