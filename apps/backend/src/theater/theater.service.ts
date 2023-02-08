import { Injectable } from '@nestjs/common';
import { Prisma, Theater } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TheaterService {
  constructor(private prisma: PrismaService) {}

  async theater(
    theaterWhereUniqueInput: Prisma.TheaterWhereUniqueInput
  ) : Promise<Theater | null> {
    return this.prisma.theater.findUnique({
        where: theaterWhereUniqueInput,
        include: {
          features: true,
          seats: true,
        },
    });
  }

  async theaters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TheaterWhereUniqueInput;
    where?: Prisma.TheaterWhereInput;
    orderBy?: Prisma.TheaterOrderByWithRelationInput;
  }): Promise<Theater[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.theater.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        features: true,
        seats: true,
      },
    });
  }

  async createTheater(data: Prisma.TheaterCreateInput): Promise<Theater> {
    return this.prisma.theater.create({
      data,
      include: {
        features: true,
        seats: true,
      },
    });
  }

  async updateTheater(params: {
    where: Prisma.TheaterWhereUniqueInput;
    data: Prisma.TheaterUpdateInput;
  }): Promise<Theater> {
    const { where, data } = params;
    return this.prisma.theater.update({
      data,
      where,
      include: {
        features: true,
        seats: true,
      },
    });
  }

  async deleteTheater(where: Prisma.TheaterWhereUniqueInput): Promise<Theater> {
    return this.prisma.theater.delete({
      where,
      include: {
        features: true,
        seats: true,
      },
    });
  }
}
