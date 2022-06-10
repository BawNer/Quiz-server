import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewerEntity } from './interviewer.entity';
import { InterviewerController } from './interviewer.controller';
import { InterviewerService } from './interviewer.service';
import { QuizEntity } from "../quiz/quiz.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InterviewerEntity, QuizEntity])],
  controllers: [InterviewerController],
  providers: [InterviewerService],
  exports: [InterviewerService],
})
export class InterviewerModule {}
