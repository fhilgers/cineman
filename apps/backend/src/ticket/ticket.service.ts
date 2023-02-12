import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.TicketUncheckedCreateInput) {
    return this.prismaService.ticket.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TicketWhereUniqueInput;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.ticket.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(TicketWhereUniqueInput: Prisma.TicketWhereUniqueInput) {
    return this.prismaService.ticket.findUniqueOrThrow({
      where: TicketWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.TicketUncheckedUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.ticket.update({
      where,
      data,
    });
  }

  remove(where: Prisma.TicketWhereUniqueInput) {
    return this.prismaService.ticket.delete({
      where,
    });
  }
}
