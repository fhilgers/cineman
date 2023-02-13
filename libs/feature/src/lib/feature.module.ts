import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { PrismaModule } from '@cineman/prisma';

export { CreateFeatureDto } from './dto/create-feature.dto';
export { UpdateFeatureDto } from './dto/update-feature.dto';
export { IFeatureGateway } from './gateway/gateway';

@Module({
  imports: [PrismaModule],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
