import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewerEntity } from './interviewer.entity';
import { InterviewerController } from './interviewer.controller';
import { InterviewerService } from './interviewer.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewerEntity])],
  controllers: [InterviewerController],
  providers: [InterviewerService],
  exports: [InterviewerService],
})
export class InterviewerModule {}
