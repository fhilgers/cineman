import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TheaterService } from './theater.service';

import { Theater } from '@prisma/client';
import { CreateTheaterDto } from '@cineman/database';

@Controller('theater')
export class TheaterController {
  constructor(
      private readonly theaterService: TheaterService,
  ) {}

  @Get(':id')
  async getTheater(@Param('id') id: string): Promise<Theater> {
    return this.theaterService.theater({ id: Number(id) });
  }

  @Delete(':id')
  async deleteTheater(@Param('id') id: string): Promise<Theater> {
    return this.theaterService.deleteTheater({ id: Number(id) });
  }

  @Get()
  async getTheaters(): Promise<Theater[]> {
    return this.theaterService.theaters({});;
  }

  @Post()
  async createTheater(
    @Body() theaterData: CreateTheaterDto
  ): Promise<Theater> {
    return this.theaterService.createTheater(theaterData.toPrisma());
  }

}
