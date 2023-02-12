import { Customer } from '@prisma/client';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export interface ICustomerGateway {
  create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
  remove(id: string): Promise<Customer>;
}
