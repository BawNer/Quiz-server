import {MigrationInterface, QueryRunner} from "typeorm";

export class QuizEntity1654849414652 implements MigrationInterface {
    name = 'QuizEntity1654849414652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interviewers" ("id" SERIAL NOT NULL, "quiz" integer NOT NULL, "bio" character varying NOT NULL, "email" character varying NOT NULL, "isEmailActive" boolean NOT NULL DEFAULT false, "activationCode" character varying, "phone" character varying, "results" text, "link" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_f7a7314e1e7d88e6751ea54a349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "link" character varying, "title" character varying NOT NULL, "questions" text, "status" character varying NOT NULL DEFAULT 'active', CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "interviewers"`);
    }

}
