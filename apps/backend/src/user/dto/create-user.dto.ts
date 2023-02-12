import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Max,
  MaxDate,
  Min,
  MinDate,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the User',
    uniqueItems: true,
  })
  @IsNotEmpty()
  // TODO validate uniqueness
  username: string;

  @ApiProperty({
    description: 'The password hash of the User',
  })
  @IsNotEmpty()
  hash: string;

  @ApiProperty({
    description: 'The roles of the User',
    examples: [[Role.USER, Role.ADMIN], [Role.USER]],
    isArray: true,
  })
  @IsEnum(Role, { each: true })
  roles: Role[];
}
