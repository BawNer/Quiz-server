import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from './quiz.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizResponseInterface } from './types/quizResponse.interface';
import { UserEntity } from '../user/user.entity';
import { QuizResponseArrayInterface } from './types/QuizResponseArrayInterface';
import { InterviewerEntity } from '../interviewer/interviewer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(InterviewerEntity)
    private readonly interviewerRepository: Repository<InterviewerEntity>,
  ) {}

  async findById(id: number): Promise<QuizEntity> {
    const quiz = await this.quizRepository.findOne(id);
    if (!quiz) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return quiz;
  }

  async createQuiz(
    createQuizDto: CreateQuizDto,
    author: UserEntity,
  ): Promise<QuizEntity> {
    const newQuiz = new QuizEntity();
    Object.assign(newQuiz, createQuizDto);
    newQuiz.author = author;
    return await this.quizRepository.save(newQuiz);
  }

  async updateQuiz(
    quizId: number,
    updateQuizDto: CreateQuizDto,
    author: UserEntity,
  ): Promise<QuizEntity> {
    const quiz = await this.findById(quizId);
    Object.assign(quiz, updateQuizDto);
    quiz.author = author;
    return await this.quizRepository.save(quiz);
  }

  async findAll(
    query: any,
    author: UserEntity,
  ): Promise<QuizResponseArrayInterface> {
    const queryBuilder = getRepository(QuizEntity)
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.author', 'author')
      .leftJoinAndSelect('quiz.position', 'position')
      .leftJoinAndSelect('quiz.interviewers', 'interviewers');

    queryBuilder.orderBy('quiz.id', 'DESC');
    const quizCount = await queryBuilder.getCount();

    if (query.id) {
      queryBuilder.andWhere('quiz.link = :link', {
        link: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_NAME}/join/quiz/${query.id}`,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('quiz.status = :status', { status: query.status });
    }

    const quiz = await queryBuilder.getMany();

    return {
      quiz,
      quizCount,
    };
  }

  buildResponse(quiz: QuizEntity): QuizResponseInterface {
    return {
      quiz: quiz,
    };
  }
}
