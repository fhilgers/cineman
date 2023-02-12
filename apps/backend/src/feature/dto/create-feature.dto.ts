import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFeatureDto {
  @ApiProperty({
    description: 'The name of the feature',
    examples: ['3D', '4D', 'Dolby Atmos'],
  })
  @IsNotEmpty()
  name: string;
}
