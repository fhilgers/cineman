import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@cineman/prisma';

@Injectable()
export class TheaterService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.TheaterCreateInput) {
    return this.prismaService.theater.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TheaterWhereUniqueInput;
    where?: Prisma.TheaterWhereInput;
    orderBy?: Prisma.TheaterOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.theater.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(TheaterWhereUniqueInput: Prisma.TheaterWhereUniqueInput) {
    return this.prismaService.theater.findUniqueOrThrow({
      where: TheaterWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.TheaterWhereUniqueInput;
    data: Prisma.TheaterUpdateInput;
  }) {
    const { where, data } = params;

    if (data.seats)
      await this.prismaService.theater.update({
        where,
        data: { seats: { deleteMany: { theaterId: where.id } } },
      });

    return this.prismaService.theater.update({
      where,
      data,
    });
  }

  remove(where: Prisma.TheaterWhereUniqueInput) {
    return this.prismaService.theater.delete({
      where,
    });
  }
}
