import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '@prisma/client';
import { ITicketGateway } from './gateway/gateway';

@Controller('tickets')
export class TicketController implements ITicketGateway {
  constructor(private readonly TicketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.TicketService.create(createTicketDto);
  }

  @Get()
  findAll() : Promise<Ticket[]> {
    return this.TicketService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Ticket> {
    return this.TicketService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) : Promise<Ticket> {
    return this.TicketService.update({where : { id }, data: updateTicketDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Ticket> {
    return this.TicketService.remove({ id });
  }
}
