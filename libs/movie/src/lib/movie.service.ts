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
    include?: Prisma.MovieInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.movie.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(params: {
    where: Prisma.MovieWhereUniqueInput;
    include?: Prisma.MovieInclude;
  }) {
    const { where, include } = params;
    return this.prismaService.movie.findUniqueOrThrow({
      where,
      include,
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

  rate(
    movieWhere: Prisma.MovieWhereUniqueInput,
    customerWhere: Prisma.CustomerWhereUniqueInput,
    stars: number,
    review: string
  ) {
    return this.prismaService.rating.create({
      data: {
        movie: { connect: movieWhere },
        customer: { connect: customerWhere },
        stars,
        review,
      },
    });
  }
}
