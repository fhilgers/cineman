import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { Theater } from '@prisma/client';
import { ITheaterGateway } from './gateway/gateway';

@Controller('theaters')
export class TheaterController implements ITheaterGateway {
  constructor(private readonly TheaterService: TheaterService) {}

  @Post()
  create(@Body() createTheaterDto: CreateTheaterDto): Promise<Theater> {
    return this.TheaterService.create(createTheaterDto);
  }

  @Get()
  findAll() : Promise<Theater[]> {
    return this.TheaterService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Theater> {
    return this.TheaterService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto) : Promise<Theater> {
    return this.TheaterService.update({where : { id }, data: updateTheaterDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Theater> {
    return this.TheaterService.remove({ id });
  }
}
