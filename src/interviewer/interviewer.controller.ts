import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { InterviewerEntity } from './interviewer.entity';
import { UpdateInterviewerDto } from './dto/updateInterviewer.dto';
import { InterviewersResponseInterface } from './types/interviewersResponse.interface';

@Controller('interviewer')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createInterviewer(
    @Body('interviewer') createInterviewerDto: CreateInterviewerDto,
  ): Promise<InterviewerEntity> {
    return await this.interviewerService.createInterviewer(
      createInterviewerDto,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateInterviewer(
    @Body('interviewer') updateInterviewerDto: UpdateInterviewerDto,
    @Param('id') id: number,
  ): Promise<InterviewerEntity> {
    return await this.interviewerService.updateInterviewer(
      updateInterviewerDto,
      id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async interviewersList(
    @Query() query: any,
  ): Promise<InterviewersResponseInterface> {
    return await this.interviewerService.findAll(query);
  }
}
