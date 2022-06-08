import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewerEntity } from './interviewer.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { UpdateInterviewerDto } from './dto/updateInterviewer.dto';
import { InterviewersResponseInterface } from './types/interviewersResponse.interface';

@Injectable()
export class InterviewerService {
  constructor(
    @InjectRepository(InterviewerEntity)
    private readonly interviewerRepository: Repository<InterviewerEntity>,
  ) {}

  async createInterviewer(
    createInterviewerDto: CreateInterviewerDto,
  ): Promise<InterviewerEntity> {
    const interviewer = new InterviewerEntity();
    Object.assign(interviewer, createInterviewerDto);
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

    queryBuilder.orderBy('DESC');
    const interviewersCount = await queryBuilder.getCount();

    if (query.id) {
      queryBuilder.andWhere('interviewers.id = :id', { id: query.id });
    }

    if (query.results) {
      queryBuilder.andWhere('interviewers.results NOT NULL');
    }

    if (query.quiz) {
      queryBuilder.andWhere('interviewers.quiz = :quiz', { quiz: query.quiz });
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
