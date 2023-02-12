import { IsNotEmpty } from 'class-validator';
import { IsUniqueTheaterName } from '../theater.validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsUniqueTheaterName()
  name: string;
}
