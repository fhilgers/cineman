import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@cineman/prisma';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MovieCreateInput) {
    return this.prismaService.movie.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MovieWhereUniqueInput;
    where?: Prisma.MovieWhereInput;
    orderBy?: Prisma.MovieOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.movie.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(movieWhereUniqueInput: Prisma.MovieWhereUniqueInput) {
    return this.prismaService.movie.findUniqueOrThrow({
      where: movieWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: Prisma.MovieUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.movie.update({
      where,
      data,
    });
  }

  remove(where: Prisma.MovieWhereUniqueInput) {
    return this.prismaService.movie.delete({
      where,
    });
  }
}
