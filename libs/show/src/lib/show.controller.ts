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
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Role, Show } from '@prisma/client';
import { IShowGateway } from './gateway/gateway';
import { Public, Roles } from '@cineman/authorization';

@Controller('shows')
export class ShowController implements IShowGateway {
  constructor(private readonly ShowService: ShowService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.ShowService.create(createShowDto);
  }

  @Get()
  @Public()
  findAll(@Query('theaterId') theaterId: string): Promise<Show[]> {
    return this.ShowService.findAll({ where: { theaterId } });
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Show> {
    return this.ShowService.findOne({ id });
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowDto
  ): Promise<Show> {
    return this.ShowService.update({ where: { id }, data: updateShowDto });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<Show> {
    return this.ShowService.remove({ id });
  }
}
