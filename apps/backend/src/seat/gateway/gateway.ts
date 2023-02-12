import { Seat } from "@prisma/client";
import { CreateSeatDto } from "../dto/create-seat.dto";
import { UpdateSeatDto } from "../dto/update-seat.dto";

export interface ISeatGateway {

  create(createSeatDto: CreateSeatDto): Promise<Seat>;
  findAll() : Promise<Seat[]>;
  findOne(id: string) : Promise<Seat>;
  update(id: string, updateSeatDto: UpdateSeatDto) : Promise<Seat>;
  remove(id: string) : Promise<Seat>;
}
