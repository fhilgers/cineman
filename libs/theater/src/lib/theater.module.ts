import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { TheaterExistsRule, UniqueTheaterNameRule } from './theater.validator';
import { PrismaModule } from '@cineman/prisma';

export { CreateTheaterDto } from './dto/create-theater.dto';
export { UpdateTheaterDto } from './dto/update-theater.dto';
export { ITheaterGateway } from './gateway/gateway';

export { IsTheater } from './theater.validator';

@Module({
  imports: [PrismaModule],
  controllers: [TheaterController],
  providers: [TheaterService, TheaterExistsRule, UniqueTheaterNameRule],
  exports: [TheaterExistsRule],
})
export class TheaterModule {}
