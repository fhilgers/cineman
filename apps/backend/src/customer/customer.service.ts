import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    data: Prisma.CustomerCreateInput
  ) {
    return this.prismaService.customer.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    CustomerWhereUniqueInput: Prisma.CustomerWhereUniqueInput
  ) {
    return this.prismaService.customer.findUniqueOrThrow({
      where: CustomerWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.customer.update({
      where,
      data,
    });
  }

  remove(
    where: Prisma.CustomerWhereUniqueInput
  ) {
    return this.prismaService.customer.delete({
      where,
    });
  }
}
