import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-seat.dto';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {}
