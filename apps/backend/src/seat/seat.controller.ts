import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from '@prisma/client';
import { ISeatGateway } from './gateway/gateway';

@Controller('seats')
export class SeatController implements ISeatGateway {
  constructor(private readonly SeatService: SeatService) {}

  @Post()
  async create(@Body() createSeatDto: CreateSeatDto): Promise<Seat> {
    console.log(createSeatDto);
    return this.SeatService.create(createSeatDto);
  }

  @Get()
  findAll(): Promise<Seat[]> {
    return this.SeatService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Seat> {
    return this.SeatService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeatDto: UpdateSeatDto
  ): Promise<Seat> {
    return this.SeatService.update({ where: { id }, data: updateSeatDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Seat> {
    return this.SeatService.remove({ id });
  }
}
