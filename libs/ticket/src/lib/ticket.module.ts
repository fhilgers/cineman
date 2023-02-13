import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from '@cineman/prisma';
import { UniqueSeatForShowRule } from './ticket.validator';

export { CreateTicketDto } from './dto/create-ticket.dto';
export { UpdateTicketDto } from './dto/update-ticket.dto';
export { ITicketGateway } from './gateway/gateway';

@Module({
  imports: [PrismaModule],
  controllers: [TicketController],
  providers: [TicketService, UniqueSeatForShowRule],
})
export class TicketModule {}
