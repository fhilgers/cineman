import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from '@prisma/client';
import { IShowGateway } from './gateway/gateway';

@Controller('shows')
export class ShowController implements IShowGateway {
  constructor(private readonly ShowService: ShowService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.ShowService.create(createShowDto);
  }

  @Get()
  findAll(): Promise<Show[]> {
    return this.ShowService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Show> {
    return this.ShowService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowDto
  ): Promise<Show> {
    return this.ShowService.update({ where: { id }, data: updateShowDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Show> {
    return this.ShowService.remove({ id });
  }
}
