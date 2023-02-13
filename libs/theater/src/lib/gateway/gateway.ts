import { Theater } from '@prisma/client';
import { CreateTheaterDto } from '../dto/create-theater.dto';
import { UpdateTheaterDto } from '../dto/update-theater.dto';

export interface ITheaterGateway {
  create(createTheaterDto: CreateTheaterDto): Promise<Theater>;
  findAll(): Promise<Theater[]>;
  findOne(id: string): Promise<Theater>;
  update(id: string, updateTheaterDto: UpdateTheaterDto): Promise<Theater>;
  remove(id: string): Promise<Theater>;
}
