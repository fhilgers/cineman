import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaModule } from '@cineman/prisma';
import { CustomerExistsRule } from './customer.validator';

export { CreateSeatDto as CreateCustomerDto } from './dto/create-customer.dto';
export { UpdateSeatDto as UpdateCustomerDto } from './dto/update-customer.dto';
export { ICustomerGateway } from './gateway/gateway';

export { IsCustomer } from './customer.validator';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerExistsRule],
  exports: [CustomerExistsRule],
})
export class CustomerModule {}
