import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShowService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.ShowUncheckedCreateInput) {
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
