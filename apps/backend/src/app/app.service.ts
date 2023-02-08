import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@cineman/database';

@Injectable()
export class AppService {

  client: PrismaClient = new PrismaClient();

  constructor() {
      this.client.$connect
  }

  async createData() {
    return this.client.todo.create({ data: {} });
  }

  async getData() {
    return this.client.todo.findMany({});
  }

}
