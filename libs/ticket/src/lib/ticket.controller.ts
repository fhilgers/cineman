import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  Req,
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Role, Ticket } from '@prisma/client';
import { ITicketGateway } from './gateway/gateway';
import { Public, Roles } from '@cineman/authorization';
import { Reflector } from '@nestjs/core';

@Controller('tickets')
export class TicketController implements ITicketGateway {
  constructor(private readonly TicketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.TicketService.create(createTicketDto);
  }

  @Get()
  @Public()
  findAll(
    @Query('showId') showId?: string,
    @Query('ownerId') ownerId?: string,
    @Query('includeSeat') seat = false,
    @Query('includeOwner') owner = false,
    @Query('includeShow') show = false
  ): Promise<Ticket[]> {
    return this.TicketService.findAll({
      where: { showId, ownerId },
      include: { seat, owner, show },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.TicketService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto
  ): Promise<Ticket> {
    return this.TicketService.update({ where: { id }, data: updateTicketDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Ticket> {
    return this.TicketService.remove({ id });
  }

  @Roles(Role.USER)
  @Post(':id/buy')
  buyOne(@Param('id') id: string, @Req() req: any): Promise<Ticket> {
    const userId = req.user.userId;

    return this.TicketService.update({
      where: { id },
      data: {
        owner: { connect: { userId } },
      },
    });
  }

  @Roles(Role.USER)
  @Post(':id/return')
  async returnOne(@Param('id') id: string, @Req() req: any): Promise<Ticket> {
    const userId = req.user.userId;
    return this.TicketService.return({
      where: { id },
      customerWhere: { userId },
    });
  }
}
