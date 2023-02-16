import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { Role, Theater } from '@prisma/client';
import { ITheaterGateway } from './gateway/gateway';
import { Public, Roles } from '@cineman/authorization';

@Controller('theaters')
export class TheaterController implements ITheaterGateway {
  constructor(private readonly TheaterService: TheaterService) {}

  @Post()
  create(@Body() createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const { name, seats } = createTheaterDto;

    return this.TheaterService.create({ name, seats: { create: seats } });
  }

  @Get()
  @Public()
  findAll(): Promise<Theater[]> {
    return this.TheaterService.findAll({});
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Theater> {
    return this.TheaterService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTheaterDto: UpdateTheaterDto
  ): Promise<Theater> {
    const { name, seats } = updateTheaterDto;

    return this.TheaterService.update({
      where: { id },
      data: { name, seats: { create: seats } },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Theater> {
    return this.TheaterService.remove({ id });
  }
}
