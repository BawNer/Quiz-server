import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionEntity } from './position.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePositionDto } from './dto/createPosition.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {}

  async positionsList(): Promise<PositionEntity[]> {
    return await this.positionRepository.find();
  }

  async findById(id: number): Promise<PositionEntity> {
    const position = await this.positionRepository.findOne(id);
    if (!position) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return position;
  }

  async createPosition(
    createPositionDto: CreatePositionDto,
  ): Promise<PositionEntity> {
    if (
      !(await this.positionRepository.findOne({ name: createPositionDto.name }))
    ) {
      throw new HttpException(
        `Position with name ${createPositionDto.name} are taken`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newPosition = new PositionEntity();
    Object.assign(newPosition, createPositionDto);
    return await this.positionRepository.save(newPosition);
  }

  async updatePosition(
    updatePositionDto: CreatePositionDto,
    id: number,
  ): Promise<PositionEntity> {
    const position = await this.findById(id);
    Object.assign(position, updatePositionDto);
    return await this.positionRepository.save(position);
  }

  async deletePosition(id: number): Promise<DeleteResult> {
    const position = await this.findById(id);
    return await this.positionRepository.delete(position);
  }
}
