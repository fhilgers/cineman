import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({
    description: 'The name of the customer',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The id of the user',
  })
  @IsUUID()
  // TODO validate existance
  userId: string;

  @ApiProperty({
    description: 'The address of the customer',
  })
  @IsNotEmpty()
  address: string;
}
