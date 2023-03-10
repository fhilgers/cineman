import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@cineman/prisma';

@Injectable()
export class RatingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.RatingUncheckedCreateInput) {
    return this.prismaService.rating.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RatingWhereUniqueInput;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput;
    include?: Prisma.RatingInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.rating.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(RatingWhereUniqueInput: Prisma.RatingWhereUniqueInput) {
    return this.prismaService.rating.findUniqueOrThrow({
      where: RatingWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.RatingUncheckedUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.rating.update({
      where,
      data,
    });
  }

  remove(where: Prisma.RatingWhereUniqueInput) {
    return this.prismaService.rating.delete({
      where,
    });
  }
}
