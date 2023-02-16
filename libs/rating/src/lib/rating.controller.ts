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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating, Role } from '@prisma/client';
import { IRatingGateway } from './gateway/gateway';
import { Public, Roles } from '@cineman/authorization';

@Controller('ratings')
export class RatingController implements IRatingGateway {
  constructor(private readonly RatingService: RatingService) {}

  @Roles(Role.USER)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.RatingService.create(createRatingDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('movieId') movieId?: string,
    @Query('includeCustomer') customer?: boolean,
    @Query('includeMovie') movie?: boolean
  ): Promise<Rating[]> {
    return this.RatingService.findAll({
      where: { movieId },
      include: { customer, movie },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rating> {
    return this.RatingService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    return this.RatingService.update({ where: { id }, data: updateRatingDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Rating> {
    return this.RatingService.remove({ id });
  }
}
