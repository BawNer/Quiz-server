import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'positions' })
export class PositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
