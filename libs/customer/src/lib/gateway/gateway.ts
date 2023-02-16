import { Customer } from '@prisma/client';
import { CreateSeatDto } from '../dto/create-customer.dto';
import { UpdateSeatDto } from '../dto/update-customer.dto';

export interface ICustomerGateway {
  create(createCustomerDto: CreateSeatDto): Promise<Customer>;
  findAll(userId?: string): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  update(id: string, updateCustomerDto: UpdateSeatDto): Promise<Customer>;
  remove(id: string): Promise<Customer>;
}
