import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerExistsRule } from './customer.validator';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerExistsRule],
  exports: [CustomerExistsRule],
})
export class CustomerModule {}
