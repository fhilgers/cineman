import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';

export interface ITicketGateway {
  create(createTicketDto: CreateTicketDto): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findOne(id: string): Promise<Ticket>;
  update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket>;
  remove(id: string): Promise<Ticket>;
}
