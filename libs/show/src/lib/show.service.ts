import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@cineman/prisma';

// @ts-ignore
import dayjs from 'dayjs';

@Injectable()
export class ShowService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ShowUncheckedCreateInput) {
    const seats = await this.prismaService.seat.findMany({
      where: { theaterId: data.theaterId },
    });

    const ticketData = seats.map((seat) => {
      const ticket = { price: 10, seatId: seat.id };
      if (seat.type == 'DELUXE') {
        ticket.price += 5;
      } else if (seat.type == 'REMOVABLE') {
        ticket.price += 3;
      }

      if (dayjs(data.start).isAfter('12', 'hours')) {
        ticket.price *= 1.2;
      } else if (dayjs(data.start).isAfter('18', 'hours')) {
        ticket.price *= 1.5;
      }

      ticket.price = Math.round(ticket.price);

      return ticket;
    });

    data.tickets = { createMany: { data: ticketData } };

    return this.prismaService.show.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShowWhereUniqueInput;
    where?: Prisma.ShowWhereInput;
    orderBy?: Prisma.ShowOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.show.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(ShowWhereUniqueInput: Prisma.ShowWhereUniqueInput) {
    return this.prismaService.show.findUniqueOrThrow({
      where: ShowWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.ShowWhereUniqueInput;
    data: Prisma.ShowUncheckedUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.show.update({
      where,
      data,
    });
  }

  remove(where: Prisma.ShowWhereUniqueInput) {
    return this.prismaService.show.delete({
      where,
    });
  }
}
