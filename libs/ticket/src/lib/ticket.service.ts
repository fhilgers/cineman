import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@cineman/prisma';

@Injectable()
export class TicketService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.TicketUncheckedCreateInput) {
    return this.prismaService.ticket.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TicketWhereUniqueInput;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput;
    include?: Prisma.TicketInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.ticket.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(TicketWhereUniqueInput: Prisma.TicketWhereUniqueInput) {
    return this.prismaService.ticket.findUniqueOrThrow({
      where: TicketWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.TicketUncheckedUpdateInput | Prisma.TicketUpdateInput;
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

  async return(params: {
    where: Prisma.TicketWhereUniqueInput;
    customerWhere: Prisma.CustomerWhereUniqueInput;
  }) {
    const { where, customerWhere } = params;

    console.log(customerWhere);

    const customer = await this.prismaService.customer.findUnique({
      where: customerWhere,
    });

    console.log(customer);
    const ticket = await this.prismaService.ticket.findUnique({
      where,
      include: { show: true },
    });

    if (!customer || !ticket || customer.id != ticket.ownerId) {
      throw new HttpException('Ticket not owned', HttpStatus.FORBIDDEN);
    }

    const currentTime = Date.now();
    const diff = ticket.show.start.getTime() - currentTime;

    const halfHours = diff / 1000 / 60 / 30;

    if (halfHours < 1) {
      throw new HttpException(
        'Ticket cannot be returned',
        HttpStatus.FORBIDDEN
      );
    }

    return this.prismaService.ticket.update({
      where,
      data: {
        owner: { disconnect: true },
      },
    });
  }
}
