import { Feature } from '@prisma/client';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';

export interface IFeatureGateway {
  create(createFeatureDto: CreateFeatureDto): Promise<Feature>;
  findAll(): Promise<Feature[]>;
  findOne(id: string): Promise<Feature>;
  update(id: string, updateFeatureDto: UpdateFeatureDto): Promise<Feature>;
  remove(id: string): Promise<Feature>;
}
