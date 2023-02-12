import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerModule } from '../customer/customer.module';
import { SeatModule } from '../seat/seat.module';
import { ShowModule } from '../show/show.module';
import { UniqueSeatForShowRule } from './ticket.validator';

@Module({
  imports: [PrismaModule, CustomerModule, SeatModule, ShowModule],
  controllers: [TicketController],
  providers: [TicketService, UniqueSeatForShowRule],
})
export class TicketModule {}
