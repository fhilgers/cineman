import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-customer.dto';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {}
