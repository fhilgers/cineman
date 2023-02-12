import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { TheaterExistsRule, UniqueTheaterNameRule } from './theater.validator';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TheaterController],
  providers: [TheaterService, TheaterExistsRule, UniqueTheaterNameRule],
  exports: [TheaterExistsRule]
})
export class TheaterModule {}
