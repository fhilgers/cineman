import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { PrismaModule } from '@cineman/prisma';
import { SeatExistsRule, UniqueNumberForTheaterRule } from './seat.validator';

export { CreateRatingDto as CreateSeatDto } from './dto/create-seat.dto';
export { UpdateRatingDto as UpdateSeatDto } from './dto/update-seat.dto';
export { ISeatGateway } from './gateway/gateway';

export { IsSeat } from './seat.validator';

@Module({
  imports: [PrismaModule],
  controllers: [SeatController],
  providers: [SeatService, UniqueNumberForTheaterRule, SeatExistsRule],
  exports: [SeatExistsRule],
})
export class SeatModule {}
