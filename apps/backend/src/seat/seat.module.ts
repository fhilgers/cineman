import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TheaterModule } from '../theater/theater.module';
import { SeatExistsRule, UniqueNumberForTheaterRule } from './seat.validator';

@Module({
  imports: [PrismaModule, TheaterModule],
  controllers: [SeatController],
  providers: [SeatService, UniqueNumberForTheaterRule, SeatExistsRule],
  exports: [SeatExistsRule],
})
export class SeatModule {}
