import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewerEntity } from './interviewer.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { UpdateInterviewerDto } from './dto/updateInterviewer.dto';
import { InterviewersResponseInterface } from './types/interviewersResponse.interface';
import { QuizEntity } from '../quiz/quiz.entity';

@Injectable()
export class InterviewerService {
  constructor(
    @InjectRepository(InterviewerEntity)
    private readonly interviewerRepository: Repository<InterviewerEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}

  async createInterviewer(
    createInterviewerDto: CreateInterviewerDto,
  ): Promise<InterviewerEntity> {
    const interviewer = new InterviewerEntity();
    const quiz = await this.quizRepository.findOne({
      id: createInterviewerDto.quiz,
    });
    if (!quiz) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(interviewer, createInterviewerDto);
    interviewer.quiz = quiz;
    return await this.interviewerRepository.save(interviewer);
  }

  async findById(id: number): Promise<InterviewerEntity> {
    const interviewer = await this.interviewerRepository.findOne(id);
    if (!interviewer) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return interviewer;
  }

  async updateInterviewer(
    updateInterviewerDto: UpdateInterviewerDto,
    id: number,
  ): Promise<InterviewerEntity> {
    const interviewer = await this.findById(id);
    Object.assign(interviewer, updateInterviewerDto);
    return await this.interviewerRepository.save(interviewer);
  }

  async findAll(query: any): Promise<InterviewersResponseInterface> {
    const queryBuilder = getRepository(InterviewerEntity)
      .createQueryBuilder('interviewers')
      .leftJoinAndSelect('interviewers.quiz', 'quiz');

    queryBuilder.orderBy('interviewers.id', 'DESC');
    const interviewersCount = await queryBuilder.getCount();

    if (query.id) {
      queryBuilder.andWhere('interviewers.id = :id', { id: query.id });
    }

    if (query.results) {
      queryBuilder.andWhere('interviewers.results NOT NULL');
    }

    if (query.email) {
      queryBuilder.andWhere('interviewers.email = :email', {
        email: query.email,
      });
    }

    const interviewers = await queryBuilder.getMany();

    return {
      interviewers,
      interviewersCount,
    };
  }
}
