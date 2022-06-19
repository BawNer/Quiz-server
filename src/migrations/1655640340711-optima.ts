import {MigrationInterface, QueryRunner} from "typeorm";

export class optima1655640340711 implements MigrationInterface {
    name = 'optima1655640340711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "link" character varying, "title" character varying NOT NULL, "questions" text, "status" character varying NOT NULL DEFAULT 'active', "authorId" integer, "positionId" integer, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interviewers" ("id" SERIAL NOT NULL, "bio" character varying NOT NULL, "email" character varying NOT NULL, "isEmailActive" boolean NOT NULL DEFAULT false, "activationCode" character varying, "phone" character varying, "results" text, "link" character varying NOT NULL DEFAULT '', "quizId" integer, CONSTRAINT "PK_f7a7314e1e7d88e6751ea54a349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_82f71b10f6749c8e9d3e835668b" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_98660b5f774b342a97a407c1097" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviewers" ADD CONSTRAINT "FK_3b2dd07769c5ffe3bf76043ee30" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviewers" DROP CONSTRAINT "FK_3b2dd07769c5ffe3bf76043ee30"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_98660b5f774b342a97a407c1097"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_82f71b10f6749c8e9d3e835668b"`);
        await queryRunner.query(`DROP TABLE "interviewers"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
