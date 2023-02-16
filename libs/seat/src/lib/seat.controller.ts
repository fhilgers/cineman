import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateRatingDto } from './dto/create-seat.dto';
import { UpdateRatingDto } from './dto/update-seat.dto';
import { Seat } from '@prisma/client';
import { ISeatGateway } from './gateway/gateway';

@Controller('seats')
export class SeatController implements ISeatGateway {
  constructor(private readonly SeatService: SeatService) {}

  @Post()
  async create(@Body() createSeatDto: CreateRatingDto): Promise<Seat> {
    console.log(createSeatDto);
    return this.SeatService.create(createSeatDto);
  }

  @Get()
  findByTheater(@Query('theaterId') theaterId: string): Promise<Seat[]> {
    return this.SeatService.findAll({ where: { theaterId } });
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
    @Body() updateSeatDto: UpdateRatingDto
  ): Promise<Seat> {
    return this.SeatService.update({ where: { id }, data: updateSeatDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Seat> {
    return this.SeatService.remove({ id });
  }
}
