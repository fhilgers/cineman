import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';

@Module({
  imports: [],
  controllers: [TheaterController],
  providers: [PrismaService, TheaterService],
})
export class TheaterModule {

}
