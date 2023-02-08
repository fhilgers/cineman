import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {}

  async createData() {
    return this.prisma.movie.create({
      data: {
        name: 'Movie',
        description: 'A movie',
        age: 12,
        duration: 15,
      }
    })
  }

  async getData() {
    return this.prisma.movie.findMany({});
  }

}
