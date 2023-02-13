import { Show } from '@prisma/client';
import { CreateShowDto } from '../dto/create-show.dto';
import { UpdateShowDto } from '../dto/update-show.dto';

export interface IShowGateway {
  create(createShowDto: CreateShowDto): Promise<Show>;
  findAll(): Promise<Show[]>;
  findOne(id: string): Promise<Show>;
  update(id: string, updateShowDto: UpdateShowDto): Promise<Show>;
  remove(id: string): Promise<Show>;
}
