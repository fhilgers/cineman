import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeatureService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    data: Prisma.FeatureCreateInput
  ) {
    return this.prismaService.feature.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FeatureWhereUniqueInput;
    where?: Prisma.FeatureWhereInput;
    orderBy?: Prisma.FeatureOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.feature.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    FeatureWhereUniqueInput: Prisma.FeatureWhereUniqueInput
  ) {
    return this.prismaService.feature.findUniqueOrThrow({
      where: FeatureWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.FeatureWhereUniqueInput;
    data: Prisma.FeatureUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.feature.update({
      where,
      data,
    });
  }

  remove(
    where: Prisma.FeatureWhereUniqueInput
  ) {
    return this.prismaService.feature.delete({
      where,
    });
  }
}
