import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from '@prisma/client';
import { IFeatureGateway } from './gateway/gateway';

@Controller('features')
export class FeatureController implements IFeatureGateway {
  constructor(private readonly FeatureService: FeatureService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return this.FeatureService.create(createFeatureDto);
  }

  @Get()
  findAll() : Promise<Feature[]> {
    return this.FeatureService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Feature> {
    return this.FeatureService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) : Promise<Feature> {
    return this.FeatureService.update({where : { id }, data: updateFeatureDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Feature> {
    return this.FeatureService.remove({ id });
  }
}
