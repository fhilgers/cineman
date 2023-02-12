import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeatService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    data: Prisma.SeatUncheckedCreateInput
  ) {
    return this.prismaService.seat.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SeatWhereUniqueInput;
    where?: Prisma.SeatWhereInput;
    orderBy?: Prisma.SeatOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.seat.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    SeatWhereUniqueInput: Prisma.SeatWhereUniqueInput
  ) {
    return this.prismaService.seat.findUniqueOrThrow({
      where: SeatWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.SeatWhereUniqueInput;
    data: Prisma.SeatUncheckedUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.seat.update({
      where,
      data,
    });
  }

  remove(
    where: Prisma.SeatWhereUniqueInput
  ) {
    return this.prismaService.seat.delete({
      where,
    });
  }
}
