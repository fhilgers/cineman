import { Seat } from '@prisma/client';
import { CreateRatingDto } from '../dto/create-seat.dto';
import { UpdateRatingDto } from '../dto/update-seat.dto';

export interface ISeatGateway {
  create(createSeatDto: CreateRatingDto): Promise<Seat>;
  findAll(): Promise<Seat[]>;
  findOne(id: string): Promise<Seat>;
  update(id: string, updateSeatDto: UpdateRatingDto): Promise<Seat>;
  remove(id: string): Promise<Seat>;
}
