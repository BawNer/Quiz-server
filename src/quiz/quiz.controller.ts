import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizResponseInterface } from './types/quizResponse.interface';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { QuizResponseArrayInterface } from './types/QuizResponseArrayInterface';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query() query: any,
    @User() author: UserEntity,
  ): Promise<QuizResponseArrayInterface> {
    return await this.quizService.findAll(query, author);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createQuiz(
    @Body('quiz') createQuizDto: CreateQuizDto,
    @User() author: UserEntity,
  ): Promise<QuizResponseInterface> {
    const quiz = await this.quizService.createQuiz(createQuizDto, author);
    return this.quizService.buildResponse(quiz);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateQuiz(
    @Param('id') quizId: number,
    @Body('quiz') updateQuizDto: CreateQuizDto,
    @User() author: UserEntity,
  ): Promise<QuizResponseInterface> {
    const quiz = await this.quizService.updateQuiz(
      quizId,
      updateQuizDto,
      author,
    );
    return this.quizService.buildResponse(quiz);
  }
}
