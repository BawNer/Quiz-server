import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionEntity } from './position.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreatePositionDto } from './dto/createPosition.dto';
import { DeleteResult } from 'typeorm';

@Controller()
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('positions')
  async positionsList(): Promise<PositionEntity[]> {
    return await this.positionService.positionsList();
  }

  @Get('position/:id')
  async currentPosition(@Param('id') id: number): Promise<PositionEntity> {
    return await this.positionService.findById(id);
  }

  @Post('position')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createPosition(
    createPositionDto: CreatePositionDto,
  ): Promise<PositionEntity> {
    return await this.positionService.createPosition(createPositionDto);
  }

  @Put('position/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updatePosition(
    updatePositionDto: CreatePositionDto,
    @Param('id') id: number,
  ): Promise<PositionEntity> {
    return await this.positionService.updatePosition(updatePositionDto, id);
  }

  @Delete('position/:id')
  @UseGuards(AuthGuard)
  async deletePosition(@Param('id') id: number): Promise<DeleteResult> {
    return await this.positionService.deletePosition(id);
  }
}
